import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders logo', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Placeholder/i);
  expect(linkElement).toBeInTheDocument();
});
