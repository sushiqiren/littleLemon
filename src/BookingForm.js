import { useState, useEffect } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm, isSubmitting, submitError }) {
  // State variables for each form field
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Validate form whenever any field changes
  useEffect(() => {
    const validateForm = () => {
      const errors = {};
      
      // Check if date is selected and not in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = date ? new Date(date) : null;
      const isDateValid = selectedDate && selectedDate >= today;
      
      if (!date) {
        errors.date = 'Please select a date for your reservation';
      } else if (!isDateValid) {
        errors.date = 'Please select a date that is today or in the future';
      }

      // Check if time is selected
      const isTimeValid = time && time.length > 0;
      if (!isTimeValid) {
        errors.time = 'Please select a time for your reservation';
      }

      // Check if guests number is valid (between 1 and 10)
      const guestsNum = parseInt(guests);
      const isGuestsValid = !isNaN(guestsNum) && guestsNum >= 1 && guestsNum <= 10;
      
      if (!guests || guests === '') {
        errors.guests = 'Please enter the number of guests';
      } else if (!isGuestsValid) {
        errors.guests = 'Number of guests must be between 1 and 10';
      }

      // Check if occasion is selected
      const isOccasionValid = occasion && occasion.length > 0;
      if (!isOccasionValid) {
        errors.occasion = 'Please select an occasion';
      }

      setValidationErrors(errors);
      // Form is valid if all fields are valid
      setIsFormValid(isDateValid && isTimeValid && isGuestsValid && isOccasionValid);
    };

    validateForm();
  }, [date, time, guests, occasion]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    // Dispatch action to update available times based on selected date
    dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
  };

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    // Only allow numbers between 1 and 10
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setGuests(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Double-check form validity before submission
    if (!isFormValid) {
      alert('Please fill in all required fields correctly before submitting.');
      return;
    }
    
    // Check if there are available times
    if (!availableTimes || availableTimes.length === 0) {
      alert('Sorry, there are no available times for the selected date. Please choose another date.');
      return;
    }
    
    // Prepare form data
    const formData = {
      date,
      time,
      guests: parseInt(guests),
      occasion
    };
    
    console.log('Reservation submitted:', formData);
    
    // Submit form using the submitForm function passed as prop
    submitForm(formData);
  };

  return (
    <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={handleSubmit}>
      {submitError && (
        <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }} role="alert">
          <strong>Error:</strong> {submitError}
        </div>
      )}
      
      <label htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        value={date}
        onChange={handleDateChange}
        min={new Date().toISOString().split('T')[0]}
        required
        aria-invalid={!!validationErrors.date}
        aria-describedby={validationErrors.date ? "date-error" : undefined}
      />
      {validationErrors.date && (
        <span id="date-error" style={{ color: 'red', fontSize: '0.875rem' }} role="alert">
          {validationErrors.date}
        </span>
      )}
      
      <label htmlFor="res-time">Choose time</label>
      <select 
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        disabled={!availableTimes || availableTimes.length === 0}
        aria-invalid={!!validationErrors.time}
        aria-describedby={validationErrors.time ? "time-error" : undefined}
      >
        {(!availableTimes || availableTimes.length === 0) ? (
          <option>No times available</option>
        ) : (
          availableTimes.map((availableTime) => (
            <option key={availableTime}>{availableTime}</option>
          ))
        )}
      </select>
      {validationErrors.time && (
        <span id="time-error" style={{ color: 'red', fontSize: '0.875rem' }} role="alert">
          {validationErrors.time}
        </span>
      )}
      {(!availableTimes || availableTimes.length === 0) && date && (
        <span style={{ color: 'orange', fontSize: '0.875rem' }} role="alert">
          No available times for this date. Please select another date.
        </span>
      )}
      <label htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        onChange={handleGuestsChange}
        required
        aria-label="Number of guests"
        aria-invalid={!!validationErrors.guests}
        aria-describedby={validationErrors.guests ? "guests-error" : undefined}
      />
      {validationErrors.guests && (
        <span id="guests-error" style={{ color: 'red', fontSize: '0.875rem' }} role="alert">
          {validationErrors.guests}
        </span>
      )}
      
      <label htmlFor="occasion">Occasion</label>
      <select 
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        required
        aria-label="Occasion"
        aria-invalid={!!validationErrors.occasion}
        aria-describedby={validationErrors.occasion ? "occasion-error" : undefined}
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>
      {validationErrors.occasion && (
        <span id="occasion-error" style={{ color: 'red', fontSize: '0.875rem' }} role="alert">
          {validationErrors.occasion}
        </span>
      )}
      
      <input 
        type="submit" 
        value={isSubmitting ? "Submitting..." : "Make Your reservation"}
        disabled={!isFormValid || isSubmitting || !availableTimes || availableTimes.length === 0}
        aria-label="Make reservation"
        style={{ cursor: isSubmitting ? 'wait' : 'pointer' }}
      />
    </form>
  );
}

export default BookingForm;
