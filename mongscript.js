const mongoose = require("mongoose");
const connectDB = require("./config/db");

connectDB()
  .then(() => {
    console.log("connected");
    let db = mongoose.connection.db;
    return db.collection("products").rename("items");
  })
  .then(() => {
    console.log("rename successful");
  })
  .catch((e) => {
    console.log("rename failed:", e.message);
  })
  .then(() => {
    console.log("disconnecting");
    mongoose.disconnect();
  });
