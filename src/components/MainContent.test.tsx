import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createSampleClinicDataSource, type ClinicDataSource } from '../data/clinic';
import MainContent from './MainContent';

describe('MainContent MVP workflows', () => {
  it('shows loading and recovers from a dashboard load error', async () => {
    const sample = createSampleClinicDataSource();
    let attempts = 0;
    const dataSource: ClinicDataSource = {
      ...sample,
      async load() {
        attempts += 1;
        if (attempts === 1) {
          throw new Error('Sample load failure');
        }
        return sample.load();
      },
    };

    render(<MainContent dataSource={dataSource} />);
    expect(screen.getByRole('heading', { name: /loading clinic overview/i })).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not load the clinic overview/i);
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(await screen.findByRole('heading', { name: /^clinic overview$/i })).toBeInTheDocument();
  });

  it('shows a useful empty state when there are no agents or appointments', async () => {
    const sample = createSampleClinicDataSource();
    const dataSource: ClinicDataSource = {
      ...sample,
      async load() {
        return { agents: [], slots: [], appointments: [] };
      },
    };

    render(<MainContent dataSource={dataSource} />);

    expect(await screen.findByText(/no agents to show yet/i)).toBeInTheDocument();
    expect(screen.getByText(/no sample appointments yet/i)).toBeInTheDocument();
  });

  it('opens an agent profile with related care topics and neutral therapy information', async () => {
    render(<MainContent dataSource={createSampleClinicDataSource()} />);

    fireEvent.click(await screen.findByRole('button', { name: /open aria's profile/i }));

    expect(screen.getByRole('heading', { name: 'Aria', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /shared care topics/i })).toBeInTheDocument();
    expect(screen.getByText(/sleep concerns/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /therapy information/i })).toBeInTheDocument();
    expect(screen.getByText(/not a diagnosis or recommendation/i)).toBeInTheDocument();
    expect(screen.getByText(/sleep routine support/i)).toBeInTheDocument();
  });

  it('reviews and confirms a sample booking that appears in the staff list', async () => {
    render(<MainContent dataSource={createSampleClinicDataSource()} />);

    fireEvent.click(await screen.findByRole('button', { name: /open aria's profile/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /select sample appointment time/i })[0]);
    fireEvent.click(screen.getByRole('button', { name: /review appointment/i }));

    expect(screen.getByRole('heading', { name: /review before confirming/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /confirm sample appointment/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/sample appointment confirmed/i);
    const appointments = screen.getByRole('heading', { name: /sample appointments/i }).closest('section');
    expect(within(appointments!).getAllByText('Aria').length).toBeGreaterThan(0);
  });

  it('keeps unavailable times disabled and offers a retry after a recoverable booking failure', async () => {
    const sample = createSampleClinicDataSource();
    let attempts = 0;
    const dataSource: ClinicDataSource = {
      ...sample,
      async book(agentId, slotId) {
        attempts += 1;
        if (attempts === 1) {
          throw new Error('Temporary sample failure');
        }
        return sample.book(agentId, slotId);
      },
    };

    render(<MainContent dataSource={dataSource} />);

    fireEvent.click(await screen.findByRole('button', { name: /open aria's profile/i }));
    expect(screen.getByRole('button', { name: /unavailable sample appointment time/i })).toBeDisabled();
    fireEvent.click(screen.getAllByRole('button', { name: /select sample appointment time/i })[0]);
    fireEvent.click(screen.getByRole('button', { name: /review appointment/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm sample appointment/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not confirm this sample booking/i);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try confirmation again/i }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/sample appointment confirmed/i));
  });

  it('handles a time becoming unavailable before confirmation', async () => {
    const sample = createSampleClinicDataSource();
    const dataSource: ClinicDataSource = {
      ...sample,
      async book() {
        return { status: 'unavailable' };
      },
    };

    render(<MainContent dataSource={dataSource} />);

    fireEvent.click(await screen.findByRole('button', { name: /open aria's profile/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /select sample appointment time/i })[0]);
    fireEvent.click(screen.getByRole('button', { name: /review appointment/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm sample appointment/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/time is no longer available/i);
    const unavailableSlots = screen.getAllByRole('button', {
      name: /unavailable sample appointment time/i,
    });
    expect(unavailableSlots).toHaveLength(2);
    for (const slot of unavailableSlots) {
      expect(slot).toBeDisabled();
    }
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
