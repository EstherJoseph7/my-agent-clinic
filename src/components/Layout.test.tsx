import { render, screen, within } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders the header, main content, and footer landmarks', () => {
    render(<Layout />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('provides navigation links to sections in the page', () => {
    render(<Layout />);

    const navigation = screen.getByRole('navigation', { name: /main navigation/i });
    const links = within(navigation).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '#overview',
      '#agents',
      '#care-flow',
      '#contact',
    ]);
    expect(links[1]).toHaveAccessibleName('Agent overview');

    for (const link of links) {
      expect(document.querySelector(link.getAttribute('href')!)).toBeInTheDocument();
    }
  });

  it('renders labeled sample data, workspace links, and clinic contact', () => {
    render(<Layout />);

    expect(screen.getByRole('heading', { name: /clinic overview/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/illustrative sample data — not live clinic information/i)).toBeInTheDocument();

    const workspaceSection = screen.getByRole('region', { name: /where would you like to go/i });
    const workspaceLinks = within(workspaceSection).getAllByRole('link');
    expect(workspaceLinks.map((link) => link.getAttribute('href'))).toEqual([
      '#agents',
      '#care-flow',
      '#contact',
    ]);

    expect(screen.getByRole('link', { name: /hello@agentclinic\.example/i })).toHaveAttribute(
      'href',
      'mailto:hello@agentclinic.example',
    );
  });
});
