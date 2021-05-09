const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  pass: {
    type: String,
  },
  address: {
    default: {
      type: Map,
    },
  },
  role: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
