import { Link } from 'react-router-dom';

function Main() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional 
            recipes served with a modern twist.
          </p>
          <Link to="/reservations">
            <button className="btn-primary" aria-label="On Click">Reserve a table</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src="/Assets/icons_assets/restauranfood.jpg" alt="Restaurant food" />
        </div>
      </section>

      {/* Specials Section */}
      <section className="specials">
        <div className="specials-header">
          <h2>Specials</h2>
          <button className="btn-secondary" aria-label="On Click">Online Menu</button>
        </div>
        <div className="specials-cards">
          <article className="card">
            <img src="/Assets/icons_assets/greek salad.jpg" alt="Greek Salad" />
            <div className="card-content">
              <div className="card-header">
                <h3>Greek Salad</h3>
                <span className="price">$12.99</span>
              </div>
              <p>
                The famous greek salad of crispy lettuce, peppers, olives and 
                our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.
              </p>
              <button className="btn-delivery" aria-label="On Click">Order a delivery 🛵</button>
            </div>
          </article>

          <article className="card">
            <img src="/Assets/icons_assets/bruchetta.svg" alt="Bruschetta" />
            <div className="card-content">
              <div className="card-header">
                <h3>Bruschetta</h3>
                <span className="price">$5.99</span>
              </div>
              <p>
                Our Bruschetta is made from grilled bread that has been smeared with 
                garlic and seasoned with salt and olive oil.
              </p>
              <button className="btn-delivery" aria-label="On Click">Order a delivery 🛵</button>
            </div>
          </article>

          <article className="card">
            <img src="/Assets/icons_assets/lemon dessert.jpg" alt="Lemon Dessert" />
            <div className="card-content">
              <div className="card-header">
                <h3>Lemon Dessert</h3>
                <span className="price">$5.00</span>
              </div>
              <p>
                This comes straight from grandma's recipe book, every last ingredient 
                has been sourced and is as authentic as can be imagined.
              </p>
              <button className="btn-delivery" aria-label="On Click">Order a delivery 🛵</button>
            </div>
          </article>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonials-cards">
          <article className="testimonial-card">
            <p className="rating">⭐⭐⭐⭐⭐</p>
            <img src="/Assets/icons_assets/Mario and Adrian A.jpg" alt="Customer" />
            <h4>Sarah M.</h4>
            <p>"Amazing food and great service!"</p>
          </article>

          <article className="testimonial-card">
            <p className="rating">⭐⭐⭐⭐⭐</p>
            <img src="/Assets/icons_assets/Mario and Adrian b.jpg" alt="Customer" />
            <h4>John D.</h4>
            <p>"Best Mediterranean restaurant in Chicago!"</p>
          </article>

          <article className="testimonial-card">
            <p className="rating">⭐⭐⭐⭐⭐</p>
            <img src="/Assets/icons_assets/restaurant chef B.jpg" alt="Customer" />
            <h4>Emily R.</h4>
            <p>"The lemon dessert is to die for!"</p>
          </article>

          <article className="testimonial-card">
            <p className="rating">⭐⭐⭐⭐⭐</p>
            <img src="/Assets/icons_assets/restaurant.jpg" alt="Customer" />
            <h4>Michael P.</h4>
            <p>"Authentic flavors and cozy atmosphere!"</p>
          </article>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. 
            Dis parturient montes nascetur ridiculus mus mauris vitae. Consectetur lorem 
            donec massa sapien faucibus et. Quisque egestas diam in arcu cursus euismod quis.
          </p>
        </div>
        <div className="about-images">
          <img src="/Assets/icons_assets/Mario and Adrian A.jpg" alt="Mario and Adrian" className="about-img-1" />
          <img src="/Assets/icons_assets/restaurant chef B.jpg" alt="Restaurant chef" className="about-img-2" />
        </div>
      </section>
    </main>
  );
}

export default Main;
