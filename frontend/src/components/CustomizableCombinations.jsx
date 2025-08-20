import { useEffect, useState } from "react";

const CustomOutfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [form, setForm] = useState({
    shirtsColor: "",
    pantsColor: "",
    blazersColor: "",
  });
  const [feedbackForms, setFeedbackForms] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/outfits");
      const data = await response.json();
      setOutfits(data);

      // Initialize feedbackForms for each outfit
      const initialForms = {};
      data.forEach((outfit) => {
        initialForms[outfit._id] = { rating: 0, feedback: "" };
      });
      setFeedbackForms(initialForms);
    } catch (error) {
      console.error("Error fetching outfits:", error);
      setError("Error fetching outfits");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFeedbackChange = (e, id) => {
    const { name, value } = e.target;
    setFeedbackForms((prevForms) => ({
      ...prevForms,
      [id]: {
        ...prevForms[id],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      shirts: form.shirtsColor,
      pants: form.pantsColor,
      blazers: form.blazersColor,
    };

    try {
      const response = await fetch("http://127.0.0.1:3001/api/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setForm({
          shirtsColor: "",
          pantsColor: "",
          blazersColor: "",
        });
        fetchOutfits();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error saving outfit");
      }
    } catch (error) {
      console.error("Error saving outfit:", error);
      setError("Error saving outfit");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/outfits/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchOutfits();
      }
    } catch (error) {
      console.error("Error deleting outfit:", error);
    }
  };

  const handleRatingSubmit = async (e, outfitId) => {
    e.preventDefault();

    const { rating, feedback } = feedbackForms[outfitId];

    if (rating < 1 || rating > 5) {
      return alert("Rating must be between 1 and 5");
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/outfits/${outfitId}/rating`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, feedback }),
        }
      );

      if (response.ok) {
        fetchOutfits();
        setFeedbackForms((prevForms) => ({
          ...prevForms,
          [outfitId]: { rating: 0, feedback: "" },
        }));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error updating rating");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
      setError("Error updating rating");
    }
  };

  const handleFavoriteToggle = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/outfits/${id}/favorite`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        fetchOutfits();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url('/assets/1.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="container py-5" style={{marginTop:"30px"}}>
        <h2 className="text-center mb-4" >Custom Outfits</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="mb-5">
          <h4>Create Outfit</h4>
          <input
            type="text"
            name="shirtsColor"
            placeholder="Shirt Color"
            value={form.shirtsColor}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="pantsColor"
            placeholder="Pants Color"
            value={form.pantsColor}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="blazersColor"
            placeholder="Blazer Color"
            value={form.blazersColor}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Save Outfit
          </button>
        </form>

        <div>
          <h4 className="mb-4" >Customized Outfits</h4>
          <div className="row">
            {outfits.length > 0 ? (
              outfits.map((outfit) => (
                <div key={outfit._id} className="col-md-4 mb-4">
                  <div
                    className="card text-dark"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{outfit.outfitNumber}</h5>
                      <p>
                        <strong>Shirt Color:</strong> {outfit.shirts}
                      </p>
                      <p>
                        <strong>Pants Color:</strong> {outfit.pants}
                      </p>
                      <p>
                        <strong>Blazer Color:</strong> {outfit.blazers}
                      </p>
                      <p>
                        <strong>Rating:</strong> {outfit.rating || "Not Rated"}
                      </p>
                      <p>
                        <strong>Feedback:</strong>{" "}
                        {outfit.feedback || "No feedback yet"}
                      </p>
                      <p>
                        <strong>Favorite Status:</strong>{" "}
                        {outfit.favorite ? "Favorited" : "Not Favorited"}
                      </p>

                      <form
                        onSubmit={(e) => handleRatingSubmit(e, outfit._id)}
                        className="mb-3"
                      >
                        <div>
                          <label>Rating (1-5): </label>
                          <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            value={feedbackForms[outfit._id]?.rating || ""}
                            onChange={(e) =>
                              handleFeedbackChange(e, outfit._id)
                            }
                            className="form-control mb-2"
                          />
                        </div>
                        <div>
                          <label>Feedback: </label>
                          <textarea
                            name="feedback"
                            value={feedbackForms[outfit._id]?.feedback || ""}
                            onChange={(e) =>
                              handleFeedbackChange(e, outfit._id)
                            }
                            className="form-control mb-2"
                          />
                        </div>
                        <button type="submit" className="btn btn-secondary">
                          Submit Rating
                        </button>
                      </form>
                      <button
                        onClick={() => handleDelete(outfit._id)}
                        className="btn btn-danger me-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleFavoriteToggle(outfit._id)}
                        className="btn btn-warning"
                      >
                        {outfit.favorite ? "Unfavorite" : "Favorite"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No outfits available.</p>
            )}
          </div>
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

export default CustomOutfits;
