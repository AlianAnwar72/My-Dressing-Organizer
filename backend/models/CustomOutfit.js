const mongoose = require("mongoose");

// Define the schema for customized outfits
const CustomOutfitSchema = new mongoose.Schema({
  outfitNumber: Number,
  shirts: String,
  pants: String,
  blazers: String,
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, min: 1, max: 5, default: null }, // Set default to null instead of 0
  feedback: { type: String, default: "" },
});

// Create a model for CustomOutfit based on the schema
const CustomOutfit = mongoose.model("CustomOutfit", CustomOutfitSchema);

module.exports = CustomOutfit;
