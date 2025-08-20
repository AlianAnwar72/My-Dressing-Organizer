/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UpdateItemForm from "../Style/UpdateItemForm.jsx";
import axios from "axios";

const UpdateItem = () => {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [lastWorn, setLastWorn] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        "http://localhost:3001/wardrobe/update",
        {
          type,
          color,
          lastWorn,
        }
      );

      setAlertMessage(response.data.message); // Set success message
      setShowAlert(true);
    } catch (err) {
      console.error("Error updating item:", err);
      setAlertMessage("Failed to update item."); // Set failure message
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <UpdateItemForm
        type={type}
        setType={setType}
        color={color}
        setColor={setColor}
        lastWorn={lastWorn}
        setLastWorn={setLastWorn}
        handleUpdate={handleUpdate}
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

export default UpdateItem;
