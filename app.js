const express = require("express");
const connectDB = require("./config/db");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world!"));
app.use("/api/items", items);
app.use("/api/users", users);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
