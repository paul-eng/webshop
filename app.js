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

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
