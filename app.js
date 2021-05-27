const express = require("express");
const connectDB = require("./config/db");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const carts = require("./routes/api/carts");
const orders = require("./routes/api/orders");
const checkout = require("./routes/api/checkout");
const path = require("path");
const cors = require("cors");
const app = express();
const { wakeDyno } = require("heroku-keep-awake");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/carts", carts);
app.use("/api/orders", orders);
app.use("/api/checkout", checkout);

// Heroku specific HTTPS redirect solution c/o Jake Trent
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.use(express.static(path.join("frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


const DYNO_URL = "https://restful-goods.herokuapp.com/";

// const opts = {
//   logging: false,
//   stopTimes: { start: "08:30", end: "19:15" },
// };

const port = process.env.PORT || 8080;
app.listen(port, () => {
  wakeDyno(DYNO_URL);
  console.log(`Server running on port ${port}`)});
