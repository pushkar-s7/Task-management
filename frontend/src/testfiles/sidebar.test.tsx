import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/sidebar/sideBar';
 
describe('Sidebar Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
 
  it('navigates to Home when Home link is clicked', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
 
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
 
homeLink.click();
 
    expect(window.location.pathname).toBe('/');
  });
 
  it('navigates to Settings when Settings link is clicked', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
 
    const settingsLink = screen.getByText('Settings');
    expect(settingsLink).toBeInTheDocument();
 settingsLink.click();
     expect(window.location.pathname).toBe('/');
  });
});