import { useEffect, useState } from "react";

const OutfitSuggestions = () => {
  const [outfits, setOutfits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/api/outfit-suggestions")
      .then((response) => response.json())
      .then((data) => setOutfits(data))
      .catch((error) => {
        console.error("Error fetching outfit suggestions:", error);
        setError("Error fetching outfit suggestions");
      });
  }, []);

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url('/assets/1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "#fff",
        padding: "50px 20px",
      }}
    >
      <h2
        className="mb-5"
        style={{
          fontSize: "2rem",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        Outfit Suggestions
      </h2>
      {error && (
        <div className="alert alert-danger" style={{ width: "80%" }}>
          {error}
        </div>
      )}
      <div className="row w-100" style={{ maxWidth: "1200px" }}>
        {outfits.length > 0 ? (
          outfits.map((outfit, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      color: "#333",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Outfit 
                  </h5>
                  <p className="card-text">
                    <strong>Blazer:</strong> {outfit.blazer.color}
                  </p>
                  <p className="card-text">
                    <strong>Shirt:</strong> {outfit.shirt.color}
                  </p>
                  <p className="card-text">
                    <strong>Pants:</strong> {outfit.pants.color}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", fontSize: "1.2rem" }}>
            No outfit suggestions available at the moment.
          </p>
        )}
      </div>
      <button
        onClick={() => (window.location.href = "/home")}
        className="btn btn-light mt-4"
        style={{
          fontSize: "1rem",
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OutfitSuggestions;
