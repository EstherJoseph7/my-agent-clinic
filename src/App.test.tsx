import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the AgentClinic name and welcome message', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /agentclinic/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/agentclinic helps people find the right care and coordinate it/i),
    ).toBeInTheDocument();
  });
});
