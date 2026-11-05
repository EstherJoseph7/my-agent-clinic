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

    for (const link of links) {
      expect(document.querySelector(link.getAttribute('href')!)).toBeInTheDocument();
    }
  });

  it('renders the care coordination timeline and contact link', () => {
    render(<Layout />);

    expect(screen.getByRole('list', { name: /care coordination timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hello@agentclinic\.example/i })).toHaveAttribute(
      'href',
      'mailto:hello@agentclinic.example',
    );
  });
});
