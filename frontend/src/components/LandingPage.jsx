import React from "react";
import { Link } from "react-router-dom";
import "../Style/LandingPage.css"; // Make sure to update this file accordingly
import Header from "./Header.jsx";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />

      {/* Welcome Section */}
      <section className="welcome-section">
        <video autoPlay muted loop className="background-video">
          <source src="/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="welcome-content">
          <h1>Welcome to My Dressing Organizer</h1>
          <p>Your wardrobe, organized and accessible like never before.</p>
          <Link to="/Login" className="btn-get-started">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h4>Add Your Items</h4>
            <p>Organize your wardrobe by adding clothing items with pictures and details.</p>
          </div>
          <div className="feature-card">
            <h4>Outfit Suggestions</h4>
            <p>Get daily outfit suggestions based on your wardrobe.</p>
          </div>
          <div className="feature-card">
            <h4>Track Wardrobe Trends</h4>
            <p>Stay updated with the latest trends to keep your wardrobe fresh and stylish.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2>Explore Your Wardrobe</h2>
        <div className="gallery-container">
          <img
            src="/assets/your-image-placeholder-1.jpg"
            alt="Clothing"
            className="gallery-image"
          />
          <img
            src="/assets/your-image-placeholder-2.jpg"
            alt="Clothing"
            className="gallery-image"
          />
          <img
            src="/assets/your-image-placeholder-3.jpg"
            alt="Clothing"
            className="gallery-image"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} My Dressing Organizer. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
