import React, { useState } from "react";
import DeleteItemForm from "../Style/DeleteItemForm.jsx";
import axios from "axios";

const DeleteItem = () => {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(
        "http://localhost:3001/wardrobe/delete",
        {
          data: { type, color },
        }
      );

      setAlertMessage(response.data.message); // Set success message
      setShowAlert(true);
    } catch (err) {
      console.error("Error deleting item:", err);
      setAlertMessage("Failed to delete item."); // Set failure message
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };
  return (
    <div>
    <DeleteItemForm
      type={type}
      setType={setType}
      color={color}
      setColor={setColor}
      handleDelete={handleDelete}
    />

    {/* Custom Alert Modal */}
    {showAlert && (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1050,
        }}
      >
        <div
          className="bg-white p-4 rounded text-center"
          style={{ minWidth: "300px" }}
        >
          <h5>{alertMessage}</h5>
          <button
            className="btn btn-primary mt-3"
            onClick={handleAlertClose}
          >
            OK
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default DeleteItem;
