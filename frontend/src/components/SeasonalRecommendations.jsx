/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const SeasonalRecommendations = () => {
  const [season, setSeason] = useState("summer"); // Default to 'summer'
  const [gender, setGender] = useState("male"); // Default to 'male'
  const [seasonalSuggestions, setSeasonalSuggestions] = useState({});
  const [error, setError] = useState(null);

  // Fetch recommendations when the component first loads or when season or gender changes
  useEffect(() => {
    fetchRecommendations(season, gender);
  }, [season, gender]);

  const fetchRecommendations = (selectedSeason, selectedGender) => {
    fetch(
      `http://127.0.0.1:3001/api/seasonal-recommendations?season=${selectedSeason}&gender=${selectedGender}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        setSeasonalSuggestions(data.recommendations);
      })
      .catch((error) => {
        setError("Error fetching seasonal recommendations");
        console.error("Error fetching recommendations:", error);
      });
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div
      className="container-fluid"
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "50px 20px",
      }}
    >
      {/* Background Image with Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/assets/1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)", // Darkens the image for better contrast
          zIndex: -2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          zIndex: -1,
        }}
      />

      {/* Page Content */}
      <h1
        className="text-center mb-4"
        style={{
          marginLeft:"420px",
          marginTop:"20px",
          padding: "10px 20px",
          borderRadius: "8px",
          display: "inline-block",
          color: "#fff",
          fontSize: "2rem",
        }}
      >
        Seasonal Outfit Suggestions
      </h1>

      <div
        className="row justify-content-center mb-4"
        style={{ textAlign: "center" }}
      >
        <div className="col-md-4 mb-3">
          <label
            htmlFor="seasonSelect"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Select Season:
          </label>
          <select
            id="seasonSelect"
            value={season}
            onChange={handleSeasonChange}
            className="form-control"
            style={{ borderRadius: "8px" }}
          >
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <div className="col-md-4">
          <label
            htmlFor="genderSelect"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Select Gender:
          </label>
          <select
            id="genderSelect"
            value={gender}
            onChange={handleGenderChange}
            className="form-control"
            style={{ borderRadius: "8px" }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger text-center"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          {error}
        </div>
      )}

      <div className="container mt-4">
        <div className="row justify-content-center">
          {Object.keys(seasonalSuggestions).length > 0 ? (
            Object.keys(seasonalSuggestions).map((category) => (
              <div
                key={category}
                className="col-md-6 col-lg-4 mb-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    color: "#333",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {seasonalSuggestions[category].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        marginBottom: "5px",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              No recommendations available. Please select a season and gender.
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

export default SeasonalRecommendations;
