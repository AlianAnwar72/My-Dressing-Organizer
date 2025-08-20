/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const UpdateItemForm = ({ type, setType, color, setColor, lastWorn, setLastWorn, handleUpdate }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url('/assets/home.jpg')`,
        backgroundSize: "cover", // Ensures the image covers the entire area
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
        color: "#fff",
        minHeight: "100vh", // Ensures the entire viewport height is used
        padding: "60px 20px", // Adds space at the top and sides
      }}
    >
      <div className="container" style={{ maxWidth: "600px" }}>
        {/* Heading */}
        <h2 className="text-center mb-4" style={{ color: "#fff", marginTop: "20px" }}>
          Update Last Worn Time
        </h2>

        {/* Form */}
        <form onSubmit={handleUpdate} className="bg-light p-4 rounded shadow">
          <div className="mb-3">
          <label className="form-label" style={{ color: "#000" }}>
            Type
          </label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option> {/* Default option */}
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="blazers">Blazer</option>
          </select>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#000" }}>
              Color
            </label>
            <input
              type="text"
              className="form-control"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              placeholder="e.g., Blue"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#000" }}>
              Last Worn (Date)
            </label>
            <input
              type="datetime-local"
              className="form-control"
              value={lastWorn}
              onChange={(e) => setLastWorn(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Update Item
          </button>
        </form>

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
    </div>
  );
};

export default UpdateItemForm;
