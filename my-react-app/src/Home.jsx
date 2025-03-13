// Combined Home.jsx
import { useState, useEffect } from "react";

function Home() {
  // Cookie Consent Functionality (from second version)
  const [cookieConsent, setCookieConsent] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setCookieConsent(true);
  };

  // Testimonials Functionality (from first version)
  const testimonials = [
    {
      img: "/images/random.jpg",
      text: "Ever since I started using Vytal, I finally understand how my progress is moving and what areas to work on. I highly recommend this platform for those that think their growth is stunted.",
      name: "Jackson Thorn",
      userSince: "User since 2021",
    },
    {
      img: "/images/sam.jpg",
      text: "Vytal has transformed my workout routine. The tracking system keeps me accountable and helps me push beyond my limits!",
      name: "Sophia Bennett",
      userSince: "User since 2022",
    },
    {
      img: "/images/zak2.jpg",
      text: "This platform provides a seamless experience for meal logging and progress tracking. It’s a must-have for fitness enthusiasts!",
      name: "Liam Carter",
      userSince: "User since 2020",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide effect every 9 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 9000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>The Ultimate Fitness Companion</h1>
          <p>
            Start your journey today with comprehensive workout and nutrition plans.
          </p>
          <a href="#" className="cta-btn">Get Started</a>
        </div>
      </section>

      {/* Workout Dictionary Section */}
      <section className="workout-dictionary">
        <div className="container">
          <h2>Workout Dictionary</h2>
          <p>Discover the best exercises to maximize your progress.</p>
          <div className="video-container">
            <video controls autoPlay loop muted>
              <source src="/videos/dictionaryvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <br /><br />
          <a href="#" className="btn">Browse Exercises</a>
        </div>
      </section>

      {/* Log Workouts & Meals Section */}
      <section className="log-section">
        <div className="container">
          <div className="log-content">
            <div className="log-text">
              <h2>Log Workouts & Meals</h2>
              <p>
                Keep track of your workouts and meals to stay on top of your fitness goals.
              </p>
              <a href="#" className="btn">Learn More</a>
            </div>
            <div className="log-images">
              <img src="/images/diethologram.jpeg" alt="Workout logging" className="log-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Track Progress Section */}
      <section className="progress-section">
        <div className="container">
          <div className="progress-content">
            <div className="progress-text">
              <h2>Track Your Progress</h2>
              <p>
                Stay on top of your fitness journey with real-time progress tracking. Monitor your workouts, meals, and personal records all in one place. Analyze trends, identify areas for improvement, and stay motivated with data-driven insights.
              </p>
              <a href="#" className="btn">View Stats</a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <p>Meet the brains and expertise behind our operations</p>
          <div className="team-carousel">
            <div className="team-members">
              <div className="team-member">
                <img src="/images/sam.jpg" alt="Samuel Simeon" className="team-img" />
                <h3>Samuel Simeon</h3>
                <p>Lead Developer</p>
                <a href="#" className="social-link">
                  <img src="/icons/instagramicon.png" alt="Instagram" className="social-icon" />
                </a>
              </div>
              <div className="team-member">
                <img src="/images/saviour.jpg" alt="Saviour Akpan" className="team-img" />
                <h3>Saviour Akpan</h3>
                <p>Personal Trainer</p>
                <a href="#" className="social-link">
                  <img src="/icons/instagramicon.png" alt="Instagram" className="social-icon" />
                </a>
              </div>
              <div className="team-member">
                <img src="/images/faarouq.jpg" alt="Faarouq Asaju" className="team-img" />
                <h3>Faarouq Asaju</h3>
                <p>Fitness Data Analyst</p>
                <a href="#" className="social-link">
                  <img src="/icons/instagramicon.png" alt="Instagram" className="social-icon" />
                </a>
              </div>
              <div className="team-member">
                <img src="/images/zak2.jpg" alt="Zak Rayman" className="team-img" />
                <h3>Zak Rayman</h3>
                <p>Researcher</p>
                <a href="#" className="social-link">
                  <img src="/icons/instagramicon.png" alt="Instagram" className="social-icon" />
                </a>
              </div>
            </div>
            <br /><br />
            <a href="#" className="btn contact-btn">Reach out to us</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h3>Testimonials</h3>
          <h2>From our Community</h2>
          <p>See what our community and beyond has to say about us</p>
          <div className="testimonial-carousel">
            <button className="carousel-btn left" onClick={prevTestimonial}>
              &#10094;
            </button>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-image">
                  <img src={testimonials[currentIndex].img} alt="User Testimonial" />
                </div>
                <div className="testimonial-text">
                  <span className="quote-icon">“</span>
                  <p>{testimonials[currentIndex].text}</p>
                  <h4>{testimonials[currentIndex].name}</h4>
                  <span>{testimonials[currentIndex].userSince}</span>
                  <span className="quote-icon right">”</span>
                </div>
              </div>
            </div>
            <button className="carousel-btn right" onClick={nextTestimonial}>
              &#10095;
            </button>
          </div>
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
          <a href="#" className="btn review-btn">Leave a review</a>
        </div>
      </section>

      {/* Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="cookie-consent-banner" style={bannerStyle}>
          <p>
            We use cookies to enhance your experience. By continuing, you agree to our cookie policy.
          </p>
          <button onClick={handleAcceptCookies} style={buttonStyle}>
            Accept Cookies
          </button>
        </div>
      )}
    </main>
  );
}

// Inline styles for the cookie consent banner
const bannerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#333",
  color: "#fff",
  padding: "1rem",
  textAlign: "center",
};

const buttonStyle = {
  marginLeft: "1rem",
  padding: "0.5rem 1rem",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
};

export default Home;
