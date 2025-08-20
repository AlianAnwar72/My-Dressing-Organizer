/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DailyTrends = () => {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the full URL if the server is on a different port
    fetch("http://127.0.0.1:3001/api/daily-trends")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convert response to JSON
      })
      .then((data) => setTrends(data))
      .catch((error) => {
        console.error("Error fetching trends:", error);
        setError("Error fetching daily trends");
      });
  }, []); // Empty array means the effect runs once when the component mounts

  return (
    <div
      className="container-fluid text-center"
      style={{
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url('/assets/your-image-placeholder-1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        padding: "50px 0",
      }}
    >
      {/* Page Heading */}
      <h1
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          display: "inline-block",
          marginBottom: "30px",
          fontSize: "1.8rem", // Reduced font size
        }}
      >
        Daily Dressing Trends
      </h1>

      

      {/* Error Message */}
      {error && (
        <div
          className="alert alert-danger"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          {error}
        </div>
      )}

      {/* Trends Cards */}
      <div className="row justify-content-center">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="col-md-4 col-sm-6 mb-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              margin: "10px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#333", fontSize: "1.2rem" }}>{trend.trend}</h3> {/* Reduced font size */}
            <p style={{ fontSize: "0.8rem", color: "#666" }}>
              {trend.description}
            </p>
          </div>
        ))}
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

export default DailyTrends;
