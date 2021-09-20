import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders the navbar', () => {
  render(<App />);
  const navbarBrand = screen.getByText(/Acme S\/A/i);
  expect(navbarBrand).toBeInTheDocument();
});
