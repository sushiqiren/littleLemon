import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders "Choose date" label text', () => {
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
  
  const labelElement = screen.getByText(/Choose date/i);
  expect(labelElement).toBeInTheDocument();
});

test('form can be submitted by the user', () => {
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
  
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
  
  // Verify the submitForm function was called with correct data
  expect(mockSubmitForm).toHaveBeenCalledWith({
    date: '2026-01-15',
    time: '19:00',
    guests: '4',
    occasion: 'Anniversary'
  });
});
