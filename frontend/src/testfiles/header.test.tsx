import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header/header';
 
test("should render menu items correctly", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
 
  expect(screen.getByText('Task Manager')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
});