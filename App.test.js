import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to my site/i);
  expect(linkElement).toBeInTheDocument();
});
