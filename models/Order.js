const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  orders: {
    type: Map,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
