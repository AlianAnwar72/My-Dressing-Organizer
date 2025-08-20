import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{
        backgroundImage: "url('/assets/home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "20px",
      }}
    >
      {/* Welcome Section */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          color: "#000",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h1 className="display-5">Welcome to My Dressing Organizer</h1>
      </div>

      {/* Options Section */}
      <div className="container">
        <div className="row">
          {/* Dynamically Responsive Columns */}
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/add-item" className="btn btn-success w-100 py-3">
              Add Item to Wardrobe
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/UpdateItem" className="btn btn-primary w-100 py-3">
              Update Item
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/DeleteItem" className="btn btn-danger w-100 py-3">
              Delete Item
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/outfit-suggestions" className="btn btn-info w-100 py-3">
              Outfit Suggestions
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/daily-trends" className="btn btn-warning w-100 py-3">
              Daily Trends
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link
              to="/seasonal-recommendations"
              className="btn btn-primary w-100 py-3"
            >
              Seasonal Recommendations
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/search-wardrobe" className="btn btn-secondary w-100 py-3">
              Search Wardrobe
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link
              to="/customizable-combinations"
              className="btn btn-dark w-100 py-3"
            >
              Customizable Combinations
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/notifications" className="btn btn-info w-100 py-3">
              Notifications
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <Link to="/login" className="btn btn-light w-100 py-3">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
