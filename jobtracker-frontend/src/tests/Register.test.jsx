import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Register from '../pages/Register';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Register Page - First Step', () => {
  it('renders account type selection (Job Seeker and Company)', () => {
    renderWithRouter(<Register />);
    
    // تأكد من وجود أزرار اختيار نوع الحساب
    const jobSeekerButton = screen.getByText(/Job Seeker/i);
    const companyButton = screen.getByText(/Company/i);
    const loginLink = screen.getByText(/Log In/i);
    
    expect(jobSeekerButton).toBeInTheDocument();
    expect(companyButton).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
});