import { useState, useEffect } from "react";
import axios from "axios";

const Notification = () => {
  const [alerts, setAlerts] = useState([]);
  const [outfitSuggestions, setOutfitSuggestions] = useState([]);
  const [eventType, setEventType] = useState("party"); // Default event type
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch unused clothing alerts
    axios
      .get("http://127.0.0.1:3001/api/unused-clothing-alerts")
      .then((response) => setAlerts(response.data))
      .catch((error) =>
        console.error("Error fetching unused clothing alerts:", error)
      );
  }, []);

  // Function to handle event type change
  const handleEventChange = (event) => {
    setEventType(event.target.value);
  };

  useEffect(() => {
    // Fetch event-based outfit suggestions when the event type changes
    setLoading(true);
    axios
      .get(
        `http://127.0.0.1:3001/api/event-based-suggestions?eventType=${eventType}`
      )
      .then((response) => {
        setOutfitSuggestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event-based outfit suggestions:", error);
        setLoading(false);
      });
  }, [eventType]); // Re-run when eventType changes

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url('/assets/home.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Ensures the background covers the entire viewport
        padding: "20px",
        color: "#fff",
      }}
    >
      <h2 className="text-center text-white mb-4">Notifications</h2>

      {/* Unused Clothing Alerts */}
      <div className="mb-5">
        <h3 className="text-white">Unused Clothing Items Alerts</h3>
        <div className="alert">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#000",
                }}
              >
                <p style={{ margin: 0 }}>{alert}</p>
              </div>
            ))
          ) : (
            <p>No unused clothing alerts.</p>
          )}
        </div>
      </div>

      {/* Event-Based Outfit Suggestions */}
      <div>
        <h3 className="text-white mb-3">Event-Based Outfit Suggestions</h3>

        {/* Event Type Dropdown */}
        <div className="mb-4">
          <label htmlFor="eventType" className="form-label text-white">
            Choose an Event:
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={handleEventChange}
            className="form-select"
            style={{
              width: "100%",
              maxWidth: "300px",
              margin: "0 auto",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <option value="party">Party</option>
            <option value="wedding">Wedding</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-warning">Loading outfit suggestions...</p>
        ) : outfitSuggestions.length > 0 ? (
          <div className="row">
            {outfitSuggestions.map((outfit, index) => {
              const { pants, blazer, shirt } = outfit.outfit || {}; // Destructure safely
              return (
                <div key={index} className="col-md-4 mb-4">
                  <div
                    className="card"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    <div className="card-body">
                      <h4 className="card-title text-primary text-center">
                        Outfit {index + 1}
                      </h4>
                      <div className="text-center">
                        {pants && blazer && shirt ? (
                          <>
                            <p>
                              <strong>Pants:</strong> {pants.color}
                            </p>
                            <p>
                              <strong>Blazer:</strong> {blazer.color}
                            </p>
                            <p>
                              <strong>Shirt:</strong> {shirt.color}
                            </p>
                          </>
                        ) : (
                          <p>Incomplete outfit details.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center">No outfit suggestions for this event.</p>
        )}
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

export default Notification;
