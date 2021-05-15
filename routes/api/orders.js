const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  res.json("We're testin' baby");
});

// @route api/orders
// @description Get all orders
router.get("/", (req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(404).json({ noordersfound: "No orders found" }));
});

// @route api/orders
// @description add new order
router.post("/", ({ headers, body: { summary } }, res) => {
  let token = headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res
        .status(400)
        .json({ error: "Cannot save order with invalid session token." });
    } else {
      Order.findOne({ user: decoded.sub }).then((match) => {
        if (match) {
          let nestedfield = `orders.${summary.order}`;
          Order.findOneAndUpdate(
            { user: decoded.sub },
            {
              [nestedfield]: summary,
            },
            { new: true }
          )
            .then((orders) => res.json(orders))
            .catch(() =>
              res
                .status(400)
                .json({ error: "Unable to add order to user record" })
            );
        } else {
          Order.create({
            user: decoded.sub,
            orders: { [summary.order]: summary },
          })
            .then((order) => res.json(order))
            .catch(() =>
              res
                .status(400)
                .json({ error: "Error creating new record of orders for user" })
            );
        }
      });
    }
  });
});

module.exports = router;
