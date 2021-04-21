const connectDB = require("./config/db");
const mongoose = require("mongoose");

connectDB();
const Item = require("./models/Item");

const qty = [
  { type: "New", qty: 0 },
  { type: "Refurbished", qty: 3 },
  { type: "Used", qty: 6 },
];
Item.updateMany(
  { category: "Zone Focus" },

  {
    stock: qty,
  },

  { multi: true },
  function (err, affected) {
    if (err) console.log(err);
    else console.log(affected);
    mongoose.connection.close();
  }
);

// Item.find({})
//   .then((items) => {
//     items.forEach((item) => {
//       item.pathname = item.pathname.substring(1);
//       item.save();
//     });
//   })
//   .catch((err) => console.log(err));

// Item.aggregate([{$group: {_id: "$category"}}])
//   .then((items) => {
//     console.log(items);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//     mongoose.connection.close();
//   });
