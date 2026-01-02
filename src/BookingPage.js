import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

// Initialize available times
export function initializeTimes() {
  try {
    // Create a Date object for today's date
    const today = new Date();
    
    // Use the fetchAPI function from the external script
    if (window.fetchAPI) {
      const times = window.fetchAPI(today);
      // Validate that we got an array with times
      if (Array.isArray(times) && times.length > 0) {
        return times;
      }
    }
  } catch (error) {
    console.error('Error initializing times:', error);
  }
  
  // Fallback if API is not available or fails
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
      try {
        // Use the fetchAPI function with the selected date
        if (action.date && window.fetchAPI) {
          const selectedDate = new Date(action.date);
          const times = window.fetchAPI(selectedDate);
          // Validate that we got an array
          if (Array.isArray(times)) {
            return times.length > 0 ? times : state;
          }
        }
      } catch (error) {
        console.error('Error updating times:', error);
      }
      // Fallback to current state if no date or API not available or fails
      return state;
    default:
      return state;
  }
}

function BookingPage() {
  // Use reducer for available booking times
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Hook for navigation
  const navigate = useNavigate();
  
  // Function to submit form data
  const submitForm = async (formData) => {
    // Validate form data before submission
    if (!formData || !formData.date || !formData.time || !formData.guests) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Submit to API
      if (window.submitAPI) {
        // Simulate async API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const success = window.submitAPI(formData);
        
        if (success) {
          // Navigate to confirmation page if submission successful
          navigate('/booking-confirmed');
        } else {
          setSubmitError('Failed to submit your reservation. Please try again.');
          setIsSubmitting(false);
        }
      } else {
        setSubmitError('Booking service is currently unavailable. Please try again later.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again or contact support.');
      setIsSubmitting(false);
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
          isSubmitting={isSubmitting}
          submitError={submitError}
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
