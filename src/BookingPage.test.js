import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initializeTimes, updateTimes } from './BookingPage';
import BookingPage from './BookingPage';

describe('BookingPage reducer functions', () => {
  test('initializeTimes returns the correct expected value', () => {
    // Mock the fetchAPI function to return a non-empty array
    const mockTimes = [
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ];
    
    window.fetchAPI = jest.fn(() => mockTimes);
    
    const result = initializeTimes();
    
    // Verify fetchAPI was called
    expect(window.fetchAPI).toHaveBeenCalled();
    
    // Verify the result matches the expected times
    expect(result).toEqual(mockTimes);
    
    // Clean up
    delete window.fetchAPI;
  });

  test('updateTimes returns the same value that is provided in the state', () => {
    const initialState = [
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ];
    
    // Mock the fetchAPI function
    window.fetchAPI = jest.fn(() => initialState);
    
    const action = {
      type: 'UPDATE_TIMES',
      date: '2026-01-15'
    };
    
    const result = updateTimes(initialState, action);
    
    // Verify fetchAPI was called with a Date object
    expect(window.fetchAPI).toHaveBeenCalled();
    expect(window.fetchAPI).toHaveBeenCalledWith(new Date('2026-01-15'));
    
    // Verify the result matches the expected times
    expect(result).toEqual(initialState);
    
    // Clean up
    delete window.fetchAPI;
  });

  test('available times change when a different date is selected', () => {
    // Mock the fetchAPI function
    const mockFetchAPI = jest.fn();
    
    // Set up different return values for different dates
    mockFetchAPI.mockImplementation((date) => {
      const dateStr = date.toISOString().split('T')[0];
      if (dateStr === '2026-01-15') {
        return ['18:00', '19:00', '20:00', '21:00'];
      } else if (dateStr === '2026-01-20') {
        return ['17:00', '18:00', '22:00'];
      }
      return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    });
    
    // Assign mock to window
    window.fetchAPI = mockFetchAPI;
    
    // Render the BookingPage component with Router
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    
    // Get the date input
    const dateInput = screen.getByLabelText(/Choose date/i);
    
    // Change to first date
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    // Get all time options
    let timeOptions = screen.getAllByRole('option').filter(option => 
      option.parentElement.id === 'res-time'
    );
    
    // Verify the times have changed to the first date's times
    expect(timeOptions).toHaveLength(4);
    expect(timeOptions[0].textContent).toBe('18:00');
    expect(timeOptions[3].textContent).toBe('21:00');
    
    // Change to second date
    fireEvent.change(dateInput, { target: { value: '2026-01-20' } });
    
    // Get updated time options
    timeOptions = screen.getAllByRole('option').filter(option => 
      option.parentElement.id === 'res-time'
    );
    
    // Verify the times have changed to the second date's times
    expect(timeOptions).toHaveLength(3);
    expect(timeOptions[0].textContent).toBe('17:00');
    expect(timeOptions[2].textContent).toBe('22:00');
    
    // Verify fetchAPI was called with the correct dates
    expect(mockFetchAPI).toHaveBeenCalled();
    
    // Clean up
    delete window.fetchAPI;
  });
});

// Error handling tests for BookingPage
describe('BookingPage error handling', () => {
  beforeEach(() => {
    // Mock console.error to avoid cluttering test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    delete window.fetchAPI;
    delete window.submitAPI;
  });

  test('initializeTimes returns fallback times when fetchAPI is not available', () => {
    delete window.fetchAPI;
    
    const result = initializeTimes();
    
    // Should return fallback times
    expect(result).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
  });

  test('initializeTimes returns fallback times when fetchAPI throws error', () => {
    window.fetchAPI = jest.fn(() => {
      throw new Error('API Error');
    });
    
    const result = initializeTimes();
    
    // Should return fallback times
    expect(result).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
    expect(console.error).toHaveBeenCalledWith('Error initializing times:', expect.any(Error));
  });

  test('initializeTimes returns fallback when fetchAPI returns empty array', () => {
    window.fetchAPI = jest.fn(() => []);
    
    const result = initializeTimes();
    
    // Should return fallback times since API returned empty array
    expect(result).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
  });

  test('initializeTimes returns fallback when fetchAPI returns non-array', () => {
    window.fetchAPI = jest.fn(() => null);
    
    const result = initializeTimes();
    
    // Should return fallback times
    expect(result).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
  });

  test('updateTimes returns current state when fetchAPI throws error', () => {
    const currentState = ['17:00', '18:00'];
    window.fetchAPI = jest.fn(() => {
      throw new Error('API Error');
    });
    
    const result = updateTimes(currentState, { type: 'UPDATE_TIMES', date: '2026-01-15' });
    
    // Should return current state when error occurs
    expect(result).toEqual(currentState);
    expect(console.error).toHaveBeenCalledWith('Error updating times:', expect.any(Error));
  });

  test('updateTimes returns current state when fetchAPI returns empty array', () => {
    const currentState = ['17:00', '18:00'];
    window.fetchAPI = jest.fn(() => []);
    
    const result = updateTimes(currentState, { type: 'UPDATE_TIMES', date: '2026-01-15' });
    
    // Should keep current state when API returns empty array
    expect(result).toEqual(currentState);
  });

  test('updateTimes returns current state when no date provided', () => {
    const currentState = ['17:00', '18:00'];
    window.fetchAPI = jest.fn();
    
    const result = updateTimes(currentState, { type: 'UPDATE_TIMES' });
    
    // Should return current state when no date
    expect(result).toEqual(currentState);
    expect(window.fetchAPI).not.toHaveBeenCalled();
  });

  test('submitForm displays error when formData is invalid', async () => {
    window.submitAPI = jest.fn(() => true);
    
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    
    // Get form elements and try to submit with missing data
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Button should be disabled initially (no date selected)
    expect(submitButton).toBeDisabled();
  });

  test('submitForm displays error when submitAPI is not available', async () => {
    delete window.submitAPI;
    window.fetchAPI = jest.fn(() => ['17:00', '18:00']);
    
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    
    // Fill the form
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Should show error message about service unavailable
    await screen.findByText(/Booking service is currently unavailable/i);
  });

  test('submitForm displays error when submitAPI returns false', async () => {
    window.submitAPI = jest.fn(() => false);
    window.fetchAPI = jest.fn(() => ['17:00', '18:00']);
    
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    
    // Fill the form
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-01-15' } });
    
    const submitButton = screen.getByDisplayValue(/Make Your reservation/i);
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Should show error message
    await screen.findByText(/Failed to submit your reservation/i);
  });
});
