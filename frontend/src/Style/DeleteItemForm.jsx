import React from "react";

const DeleteItemForm = ({ type, setType, color, setColor, handleDelete }) => {
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
          Delete Item from Wardrobe
        </h2>

        {/* Form */}
        <form onSubmit={handleDelete} className="bg-light p-4 rounded shadow">
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
            <option value="shirts">Shirt</option>
            <option value="pants">Pants</option>
            <option value="blazers">Blazer</option>
            <option value="suits">Suit</option>
            <option value="accessories">Accessories</option>
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
              placeholder="e.g., Red, Blue"
            />
          </div>
          <button type="submit" className="btn btn-danger w-100 py-2">
            Delete Item
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

export default DeleteItemForm;
