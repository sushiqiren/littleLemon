import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';

test('booking confirmation page is displayed when form is submitted', async () => {
  // Mock the API functions
  window.fetchAPI = jest.fn((date) => ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
  window.submitAPI = jest.fn(() => true);
  
  // Render the booking page with routing
  render(
    <MemoryRouter initialEntries={['/reservations']}>
      <Routes>
        <Route path="/reservations" element={<BookingPage />} />
        <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </MemoryRouter>
  );
  
  // Verify we're on the booking page
  expect(screen.getByText(/Reserve a Table/i)).toBeInTheDocument();
  
  // Get form elements
  const dateInput = screen.getByLabelText(/Choose date/i);
  const timeSelect = screen.getByLabelText(/Choose time/i);
  const guestsInput = screen.getByLabelText(/Number of guests/i);
  const occasionSelect = screen.getByLabelText(/Occasion/i);
  const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
  
  // Fill out the form
  fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
  fireEvent.change(timeSelect, { target: { value: '19:00' } });
  fireEvent.change(guestsInput, { target: { value: '4' } });
  fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });
  
  // Submit the form
  fireEvent.click(submitButton);
  
  // Wait for navigation and verify confirmation page is displayed
  await waitFor(() => {
    expect(screen.getByText(/Booking Confirmed!/i)).toBeInTheDocument();
  });
  
  // Verify confirmation message
  expect(screen.getByText(/Your table reservation has been successfully confirmed/i)).toBeInTheDocument();
  
  // Verify submitAPI was called with correct data
  expect(window.submitAPI).toHaveBeenCalledWith({
    date: '2026-01-15',
    time: '19:00',
    guests: 4, // Should be a number, not string
    occasion: 'Anniversary'
  });
  
  // Clean up
  delete window.fetchAPI;
  delete window.submitAPI;
});
