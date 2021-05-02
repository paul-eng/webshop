const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route api/users/test
router.get("/test", (req, res) => res.send("user route testing!"));

// @route api/users
// @description add/save users
router.post("/", ({ body: user }, res) => {
  bcrypt.hash(user.pass, 8, function (err, hash) {
    user.pass = hash;

    User.findOne({ email: user.email }).then((match) => {
      if (match) {
        res.status(400).json({
          error: "There is already an account with this email address.",
        });
      } else {
        User.create(user)
          .then((user) => res.json({ user }))
          .catch((err) =>
            res.status(400).json({ error: "Unable to add user", err })
          );
      }
    });
  });
});

router.post("/login", ({ body: user }, res) => {
  User.findOne({ email: user.email }).then((match) => {
    if (match) {
      bcrypt.compare(user.pass, match.pass, function (err, same) {
        if (same) {
          const token = jwt.sign({ id: match._id }, config.get("secret"));
          res.json({
            user: {
              firstname: match.firstname,
              lastname: match.lastname,
              email: match.email,
            },
            token,
          });
        } else {
          res.status(400).json({ error: "Your password is incorrect." });
        }
      });
    } else {
      res.status(400).json({
        error: "Could not find an account registered to that email address.",
      });
    }
  });
});

// @route api/users
// @description Get all users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) =>
      res.status(404).json({ noproductsfound: "No users found" })
    );
});

module.exports = router;
