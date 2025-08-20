/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const SearchWardrobe = () => {
  const [searchParams, setSearchParams] = useState({
    type: "",
    color: "",
    lastWorn: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams(searchParams).toString();
      const response = await fetch(
        `http://localhost:3001/api/wardrobe?${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wardrobe items");
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
          url('/assets/1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh", // Ensures the background covers the entire viewport
          padding: "20px",
          color: "#fff",
      }}
    >
      {/* Sticky Heading */}
      <div className="text-center top py-3" >
        <h1 className="text-white" style={{ fontSize: "2.5rem", marginTop:"50px" }}>
          Search Your Wardrobe
        </h1>
      </div>

      {/* Search Form */}
      <div className="container my-4">
        <div className="row">
        <div className="col-md-3 my-2">
            <select
              name="type"
              className="form-control"
              value={searchParams.type}
              onChange={handleSearchChange}
            >
              <option value="">Select Type</option> {/* Default option */}
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="blazers">Blazer</option>
            </select>
          </div>
          <div className="col-md-3 my-2">
            <input
              type="text"
              name="color"
              className="form-control"
              placeholder="Search by color"
              value={searchParams.color}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-3 my-2">
            <input
              type="date"
              name="lastWorn"
              className="form-control"
              value={searchParams.lastWorn}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-3 my-2">
            <button
              onClick={handleSearchSubmit}
              className="btn btn-info w-100 py-2"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Results */}
      <div className="container">
        <h4 className="text-white mb-4">Search Results:</h4>
        <div className="row">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div
                  className="card shadow"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={`http://127.0.0.1:3001/uploads/${item.imageUrl}`}
                    className="card-img-top"
                    alt={item.type}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title text-primary"
                      style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                      {item.type}
                    </h5>
                    <p className="card-text">
                      <strong>Color:</strong> {item.color} <br />
                      <strong>Last Worn:</strong>{" "}
                      {formatDate(item.lastWorn) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p
              className="text-white"
              style={{ fontSize: "1.2rem", fontStyle: "italic" }}
            >
              No wardrobe items found matching your search.
            </p>
          )}
        </div>
      </div>
      {/* Back to Home Button */}
      <div className="text-center mt-5">
          <a
            href="/home"
            className="btn btn-outline-light"
            style={{ marginBottom: "50px" }} // Ensures spacing from the footer
          >
            Back to Home
          </a>
        </div>
    </div>
  );
};

export default SearchWardrobe;
