const mongoose = require("mongoose");

const OutfitSchema = new mongoose.Schema({
  outfitNumber: String,
  shirts: { color: String, type: String },
  pants: { color: String, type: String },
  blazers: { color: String, type: String },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Outfit = mongoose.model("Outfit", OutfitSchema);
module.exports = Outfit;
