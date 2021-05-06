const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route api/carts
// @create or update cart
router.post("/", (req, res) => {
  let token = req.headers["x-access-token"];
  let cart = req.body;
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res
        .status(400)
        .json({ error: "Cannot save cart with invalid session token." });
    } else {
      Cart.findOneAndUpdate(
        { user: decoded.sub },
        { cart: cart },
        { new: true, upsert: true }
      )
        .then((doc) => res.json(doc))
        .catch((err) =>
          res.status(400).json({ error: "Error upserting cart" })
        );
    }
  });
});

// @route api/carts/session
// @read saved user cart or create new user cart
router.get("/session", (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res
        .status(403)
        .json({ error: "Cannot retrieve cart with invalid token" });
    } else {
      Cart.findOne({ user: decoded.sub }, function (err, doc) {
        if (doc) {
          res.json(doc.cart);
        } else {
          Cart.create({
            user: decoded.sub,
            cart: {
              // Find in files: SHAPEOFCARTSTATE. Won't necessarily break if a field is missing in one, but try to keep consistent for peace of mind
              items: [],
              total: 0,
              count: 0,
              qtyError: [],
            },
          })
            .then((newDoc) => res.json(newDoc.cart))
            .catch(() =>
              res.status(400).json({ error: "Error creating cart for user" })
            );
        }
      });
    }
  });
});

// @route api/carts
// @description Get all carts
router.get("/", (req, res) => {
  Cart.find()
    .then((carts) => res.json(carts))
    .catch((err) => res.status(404).json({ nocartsfound: "No carts found" }));
});

module.exports = router;
