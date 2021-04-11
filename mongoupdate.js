const connectDB = require("./config/db");
const mongoose = require("mongoose");

connectDB();
const Item = require("./models/Item");

Item.updateMany(
  {},
  {
    $set: {
      gallery: {
        0: "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/3d/44/92/3d449290-a215-6d60-457a-ad3ff3481f22/source/256x256bb.jpg",
      },
    },
  },
  { multi: true },
  function (err, affected) {
    if (err) console.log(err);
    else console.log(affected);
    mongoose.connection.close();
  }
);


