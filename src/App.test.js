import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Reserve a table button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Reserve a table/i);
  expect(buttonElement).toBeInTheDocument();
});
