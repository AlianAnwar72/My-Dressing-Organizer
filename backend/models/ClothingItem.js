const mongoose = require("mongoose");

const ClothingItemSchema = new mongoose.Schema({
    type: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    lastWorn: { type: Date, default: null },
  });
  

const ClothingItemModel = mongoose.model("ClothingItem", ClothingItemSchema);
module.exports = ClothingItemModel;