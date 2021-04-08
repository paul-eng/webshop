const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route api/users/test
router.get("/test", (req, res) => res.send("user route testing!"));

// @route api/users
// @description add/save users
router.post("/", (req, res) => {
  let account = req.body;

  bcrypt.hash("bacon", 8, function (err, hash) {
    account.password = hash;

    User.create(account)
      .then((user) => res.json({ msg: "User added successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this user", err })
      );
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
