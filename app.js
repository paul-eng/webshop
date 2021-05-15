const express = require("express");
const connectDB = require("./config/db");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const carts = require("./routes/api/carts");
const orders = require("./routes/api/orders");
const checkout = require("./routes/api/checkout");
const path = require('path')
const cors = require("cors");
const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/carts", carts);
app.use("/api/orders", orders);
app.use("/api/checkout", checkout);

// app.use(express.static(path.join(__dirname, 'frontend/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/build'))
// })


app.use(express.static(path.join(__dirname, "frontend", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
