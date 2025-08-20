/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import AddItemForm from "../Style/AddItemForm";

const AddItem = () => {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    formData.append("color", color);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3001/wardrobe/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAlertMessage("Item added successfully!");
      setShowAlert(true);
    } catch (err) {
      console.error("Error Sending Data:", err.response?.data || err.message);
      setAlertMessage("Failed to add item.");
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <AddItemForm
        type={type}
        setType={setType}
        color={color}
        setColor={setColor}
        category={category}
        setCategory={setCategory}
        setImage={setImage}
        handleSubmit={handleSubmit}
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

export default AddItem;
