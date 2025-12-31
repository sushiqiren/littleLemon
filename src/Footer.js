function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="Assets/icons_assets/Logo.svg" alt="Little Lemon logo" />
        </div>
        
        <div className="footer-section">
          <h4>Doormat Navigation</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/reservations">Reservations</a></li>
            <li><a href="/order-online">Order Online</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Address</li>
            <li>Phone number</li>
            <li>Email</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Social Media Links</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
