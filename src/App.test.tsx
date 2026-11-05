import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the dashboard overview and sample-data notice', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /clinic overview/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/illustrative sample data — not live clinic information/i),
    ).toBeInTheDocument();
  });
});
