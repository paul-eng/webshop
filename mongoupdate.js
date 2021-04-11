const connectDB = require("./config/db");
const mongoose = require("mongoose");

connectDB();
const Item = require("./models/Item");

// Item.updateMany(
//   {},
//   [
//     {
//       $set: {
//         pathname: { $toLower: "$pathname" },
//       },
//     },
//   ],
//   { multi: true },
//   function (err, affected) {
//     if (err) console.log(err);
//     else console.log(affected);
//     mongoose.connection.close();
//   }
// );

Item.find({})
  .then((items) => {
    items.forEach((item) => {
      item.pathname = item.pathname.substring(1);
      item.save();
    });
  })
  .catch((err) => console.log(err));