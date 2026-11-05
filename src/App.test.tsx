import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard and the sample-data notice', async () => {
    render(<App />);

    expect(await screen.findByRole('heading', { name: /^clinic overview$/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/illustrative sample data — not live clinic information/i)).toBeInTheDocument();
  });
});
