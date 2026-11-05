import { render, screen, within } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders the header, main content, and footer landmarks', async () => {
    render(<Layout />);

    await screen.findByRole('heading', { name: /^clinic overview$/i, level: 1 });
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('navigation links point to sections in the loaded page', async () => {
    render(<Layout />);
    await screen.findByRole('heading', { name: /^clinic overview$/i, level: 1 });

    const navigation = screen.getByRole('navigation', { name: /main navigation/i });
    const links = within(navigation).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '#overview',
      '#agents',
      '#appointments',
      '#contact',
    ]);
    expect(links[1]).toHaveAccessibleName('Agents');

    for (const link of links) {
      expect(document.querySelector(link.getAttribute('href')!)).toBeInTheDocument();
    }
  });

  it('renders the clinic overview, sample data, and clinic contact', async () => {
    render(<Layout />);

    expect(await screen.findByRole('heading', { name: /^clinic overview$/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/illustrative sample data — not live clinic information/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sample appointments/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /hello@agentclinic\.example/i })).toHaveAttribute(
      'href',
      'mailto:hello@agentclinic.example',
    );
  });
});
