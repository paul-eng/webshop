const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  gallery: {
    type: [String],
  },
  price: {
    type: Number,
  },
  stock: {
    // subdocument w/ fields to keep count for different variations of an item ie. databack, special edition, used, color etc
    type: [{ type: { type: String }, qty: Number }],
  },
  pathname: {},
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("Item", ItemSchema);
