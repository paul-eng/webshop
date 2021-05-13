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
          error: "An account already exists for that email address.",
        });
      } else {
        user.role = "user";
        User.create(user)
          .then((user) => res.json({ user }))
          .catch((err) =>
            res.status(400).json({ error: "Failed to add user", err })
          );
      }
    });
  });
});

// @route api/users/login
// @description check password and return jwt
router.post("/login", ({ body: user }, res) => {
  User.findOne({ email: user.email }).then((match) => {
    if (match) {
      bcrypt.compare(user.pass, match.pass, function (err, same) {
        if (same) {
          const token = jwt.sign(
            { sub: match._id, email: match.email, role: match.role },
            config.get("secret")
          );
          res.json({
            user: {
              firstname: match.firstname,
              lastname: match.lastname,
              email: match.email,
              address: match.address,
            },
            token,
          });
        } else {
          res.status(400).json({ error: "Your password is incorrect." });
        }
      });
    } else {
      res.status(400).json({
        error: "No account found with that email address.",
      });
    }
  });
});

// @route api/users/address
// @description Add/update address
router.post("/address", (req, res) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Unauthorized" });
    } else {
      const addKey = req.body.key;
      const newAdd = req.body.address;
      let sendUpdate = (update) => {
        User.findByIdAndUpdate(decoded.sub, update, { new: true, upsert: true })
          .then((user) => {
            res.json({ user });
          })
          .catch((err) => {
            res.status(400).json({ error: "Failed to update user address" });
          });
      };

      if (addKey) {
        const nestedfield = `address.${addKey}`;
        sendUpdate({ [nestedfield]: newAdd });
      } else {
        User.findById(decoded.sub)
          .lean()
          .then((user) => {
            if (!user.address.default) {
              sendUpdate({ "address.default": newAdd });
            } else {
              let nonDefaultAdds = Object.keys(user.address).filter((el) =>
                parseInt(el)
              );
              let sortedAdds = nonDefaultAdds
                .map((n) => parseInt(n))
                .sort((a, b) => a - b);
              let latestAdd = sortedAdds.pop();
              let next = latestAdd ? latestAdd + 1 : 1;
              let nestedfield = `address.${next}`;
              sendUpdate({ [nestedfield]: newAdd });
            }
          });
      }
    }
  });
});

// @route ap/users/address/delete
// @description Delete saved address
router.delete("/address/:key", (req, res) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Unauthorized" });
    } else {
      let nestedfield = "address." + req.params.key;
      User.findByIdAndUpdate(
        decoded.sub,
        { $unset: { [nestedfield]: "" } },
        { new: "true" }
      )
        .then((user) => res.json({ user }))
        .catch((err) =>
          res.status(400).json({ error: "Failed to delete address" })
        );
    }
  });
});

// @route api/users/verify
// @description get validated user
router.get("/verify", (req, res) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Unauthorized" });
    } else {
      User.findById(decoded.sub)
        .then((user) => {
          res.json({
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              address: user.address,
            },
            token: token,
          });
        })
        .catch((err) => {
          res.status(404).json({ error: "Unknown access token conflict" });
        });
    }
  });
});

// @route api/users/admin
// @description Check if admin role in session token
router.get("/admin", (req, res) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Token failed verification!" });
    } else {
      res.json(decoded.role === "admin");
    }
  });
});

// @route api/users
// @description Get all users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: "No users found" }));
});

module.exports = router;
