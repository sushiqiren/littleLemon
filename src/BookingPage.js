import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

// Initialize available times
export function initializeTimes() {
  // Create a Date object for today's date
  const today = new Date();
  
  // Use the fetchAPI function from the external script
  if (window.fetchAPI) {
    return window.fetchAPI(today);
  }
  
  // Fallback if API is not available
  return [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];
}

// Reducer function to update available times based on selected date
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // Use the fetchAPI function with the selected date
      if (action.date && window.fetchAPI) {
        const selectedDate = new Date(action.date);
        return window.fetchAPI(selectedDate);
      }
      // Fallback to current state if no date or API not available
      return state;
    default:
      return state;
  }
}

function BookingPage() {
  // Use reducer for available booking times
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  
  // Hook for navigation
  const navigate = useNavigate();
  
  // Function to submit form data
  const submitForm = (formData) => {
    // Submit to API
    if (window.submitAPI) {
      const success = window.submitAPI(formData);
      if (success) {
        // Navigate to confirmation page if submission successful
        navigate('/booking-confirmed');
      }
    }
  };

  return (
    <div className="booking-page">
      <section className="booking-header">
        <h1>Reserve a Table</h1>
        <p>Book your table at Little Lemon and enjoy an unforgettable dining experience.</p>
      </section>

      <section className="booking-form-section">
        <BookingForm 
          availableTimes={availableTimes}
          dispatch={dispatch}
          submitForm={submitForm}
        />
      </section>

      <section className="booking-info">
        <h2>What to Expect</h2>
        <p>
          At Little Lemon, we pride ourselves on providing exceptional Mediterranean cuisine 
          in a warm and welcoming atmosphere. Whether you're celebrating a special occasion 
          or enjoying a casual dinner, we're here to make your experience memorable.
        </p>
      </section>
    </div>
  );
}

export default BookingPage;
