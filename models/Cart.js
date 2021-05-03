const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  cart: {
    type: Map,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cart = mongoose.model("Cart", CartSchema);
