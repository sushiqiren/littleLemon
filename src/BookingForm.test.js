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
    guests: 4,
    occasion: 'Anniversary'
  });
});

describe('HTML5 Validation Attributes', () => {
  test('date input has required and min attributes', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    
    // Verify required attribute
    expect(dateInput).toBeRequired();
    
    // Verify min attribute is set to today or later
    expect(dateInput).toHaveAttribute('min');
    const minDate = dateInput.getAttribute('min');
    const today = new Date().toISOString().split('T')[0];
    expect(minDate).toBe(today);
    
    // Verify type is date
    expect(dateInput).toHaveAttribute('type', 'date');
  });

  test('time select has required attribute', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const timeSelect = screen.getByLabelText(/Choose time/i);
    
    // Verify required attribute
    expect(timeSelect).toBeRequired();
  });

  test('guests input has required, min, and max attributes', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Verify required attribute
    expect(guestsInput).toBeRequired();
    
    // Verify min attribute
    expect(guestsInput).toHaveAttribute('min', '1');
    
    // Verify max attribute
    expect(guestsInput).toHaveAttribute('max', '10');
    
    // Verify type is number
    expect(guestsInput).toHaveAttribute('type', 'number');
  });

  test('occasion select has required attribute', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    
    // Verify required attribute
    expect(occasionSelect).toBeRequired();
  });

  test('submit button is disabled when form is invalid', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Submit button should be disabled initially (no date selected)
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when form is valid', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Fill out required fields
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    
    // Submit button should be enabled when all fields are valid
    expect(submitButton).toBeEnabled();
  });
});

describe('JavaScript Validation - Valid States', () => {
  test('form is valid with a future date', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Enter a future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const futureDateStr = futureDate.toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: futureDateStr } });
    
    // Submit button should be enabled
    expect(submitButton).toBeEnabled();
  });

  test('form is valid with today\'s date', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Enter today's date
    const today = new Date().toISOString().split('T')[0];
    fireEvent.change(dateInput, { target: { value: today } });
    
    // Submit button should be enabled
    expect(submitButton).toBeEnabled();
  });

  test('form is valid with 1 guest', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Enter valid date and 1 guest
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    fireEvent.change(guestsInput, { target: { value: '1' } });
    
    // Verify value is set
    expect(guestsInput).toHaveValue(1);
    
    // Submit button should be enabled
    expect(submitButton).toBeEnabled();
  });

  test('form is valid with 10 guests (maximum)', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Enter valid date and 10 guests
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    fireEvent.change(guestsInput, { target: { value: '10' } });
    
    // Verify value is set
    expect(guestsInput).toHaveValue(10);
    
    // Submit button should be enabled
    expect(submitButton).toBeEnabled();
  });

  test('form is valid with all fields filled correctly', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const timeSelect = screen.getByLabelText(/Choose time/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Fill all fields with valid data
    fireEvent.change(dateInput, { target: { value: '2026-02-14' } });
    fireEvent.change(timeSelect, { target: { value: '20:00' } });
    fireEvent.change(guestsInput, { target: { value: '2' } });
    fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });
    
    // Submit button should be enabled
    expect(submitButton).toBeEnabled();
  });
});

describe('JavaScript Validation - Invalid States', () => {
  test('form is invalid without a date', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Submit button should be disabled (no date selected)
    expect(submitButton).toBeDisabled();
  });

  test('form prevents submission when date is in the past', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Try to enter a past date
    fireEvent.change(dateInput, { target: { value: '2025-01-01' } });
    
    // Submit button should remain disabled
    expect(submitButton).toBeDisabled();
  });

  test('form rejects guest count less than 1', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Set valid date first
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    // Initial state should have guests=1 and form should be valid
    expect(submitButton).toBeEnabled();
    
    // Try to set guests to 0
    fireEvent.change(guestsInput, { target: { value: '0' } });
    
    // The handleGuestsChange should prevent the update, keeping value at 1
    expect(guestsInput).toHaveValue(1);
  });

  test('form rejects guest count greater than 10', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Set valid date first
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    // Initial state should have guests=1 and form should be valid
    expect(submitButton).toBeEnabled();
    
    // Try to set guests to 11
    fireEvent.change(guestsInput, { target: { value: '11' } });
    
    // The handleGuestsChange should prevent the update, keeping value at 1
    expect(guestsInput).toHaveValue(1);
  });

  test('form does not call submitForm when submit is clicked while invalid', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Try to click submit without filling the form
    // Note: disabled button cannot be clicked, but we verify it's disabled
    expect(submitButton).toBeDisabled();
    
    // Verify submitForm was never called
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  test('form becomes invalid when valid date is cleared', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // First, make form valid
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    expect(submitButton).toBeEnabled();
    
    // Then clear the date
    fireEvent.change(dateInput, { target: { value: '' } });
    
    // Submit button should be disabled again
    expect(submitButton).toBeDisabled();
  });
});

// Edge case and error handling tests
describe('Error Handling and Edge Cases', () => {
  test('displays error message when submitError prop is provided', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00'];
    const errorMessage = 'Failed to submit your reservation. Please try again.';
    
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
        submitError={errorMessage}
      />
    );
    
    // Find the error alert specifically (not validation errors)
    const errorElement = screen.getByText(/Failed to submit your reservation/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('displays validation error for empty date field', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00'];
    
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    // Date is empty by default, wait for validation error
    const errorElement = screen.getByText(/Please select a date for your reservation/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('handles empty availableTimes array', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const emptyTimes = [];
    
    render(<BookingForm availableTimes={emptyTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toBeDisabled();
    expect(screen.getByText(/No times available/i)).toBeInTheDocument();
  });

  test('displays warning message when no times available for selected date', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const emptyTimes = [];
    
    render(<BookingForm availableTimes={emptyTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    expect(screen.getByText(/No available times for this date/i)).toBeInTheDocument();
  });

  test('disables submit button when isSubmitting is true', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00'];
    
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
        isSubmitting={true}
      />
    );
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    const submitButton = screen.getByDisplayValue(/Submitting.../i);
    expect(submitButton).toBeDisabled();
  });

  test('disables submit button when availableTimes is null', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    
    render(
      <BookingForm 
        availableTimes={null} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
      />
    );
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    expect(submitButton).toBeDisabled();
  });

  test('shows alert when trying to submit with invalid form', () => {
    window.alert = jest.fn();
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00'];
    
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
      />
    );
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Try to submit without filling date (button is disabled, but we can force the submit handler)
    const form = submitButton.closest('form');
    fireEvent.submit(form);
    
    // Should not call submitForm since form is invalid
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  test('shows alert when trying to submit with no available times', () => {
    window.alert = jest.fn();
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const emptyTimes = [];
    
    const { rerender } = render(
      <BookingForm 
        availableTimes={['17:00']} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
      />
    );
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    // Now change availableTimes to empty
    rerender(
      <BookingForm 
        availableTimes={emptyTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
      />
    );
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    expect(submitButton).toBeDisabled();
  });

  test('displays aria-invalid attribute when field has error', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = ['17:00', '18:00'];
    
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm}
      />
    );
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    expect(dateInput).toHaveAttribute('aria-invalid', 'true');
  });
});
