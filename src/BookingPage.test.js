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
