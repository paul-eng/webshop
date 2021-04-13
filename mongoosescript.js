const connectDB = require("./config/db");
const mongoose = require("mongoose");

connectDB();
const Item = require("./models/Item");

const img = [
  "https://tres-bien.com/media/catalog/product/cache/d4ce4a7fabbf7ab1ab848745969eb952/f/o/footwear_210319_041.jpg",
  "https://tres-bien.com/media/catalog/product/cache/d4ce4a7fabbf7ab1ab848745969eb952/f/o/footwear_210319_042.jpg",
  "https://tres-bien.com/media/catalog/product/cache/d4ce4a7fabbf7ab1ab848745969eb952/f/o/footwear_210319_043.jpg",
];
Item.updateMany(
  {},

  {
    gallery: img,
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
