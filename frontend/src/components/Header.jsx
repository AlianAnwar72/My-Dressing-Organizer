import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        {/* Left side: My Dressing Organizer */}
        <a className="navbar-brand" href="/">
          My Dressing Organizer
        </a>
        {/* Right side: Sign Up and Login */}
        <div className="ml-auto">
          <Link to="/" className="btn btn-success mx-2">
            Home
          </Link>
          <Link to="/register" className="btn btn-primary mx-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-warning mx-2">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
