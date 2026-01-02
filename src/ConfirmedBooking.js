import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <div className="confirmed-booking">
      <div className="confirmation-content">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your table reservation has been successfully confirmed.</p>
        <p>We look forward to serving you at Little Lemon!</p>
        <p>You will receive a confirmation email shortly with all the details of your reservation.</p>
        <Link to="/">
          <button className="btn-primary" aria-label="On Click">Return to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmedBooking;
