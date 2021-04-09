const express = require("express");
const router = express.Router();

// Load Item model
const Item = require("../../models/Item");

// @route api/items/test
router.get("/test", (req, res) => res.send("item route testing!"));

// @route api/items
// @description add/save item
router.post("/", (req, res) => {
  Item.create(req.body)
    .then((item) => res.json({ msg: "Item added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this item", err })
    );
});

// @route api/items
// @description Get all items in alphabetical order
router.get("/", (req, res) => {
  Item.find().sort({brand: 1, name: 1})
    .then((items) => res.json(items))
    .catch((err) =>
      res.status(404).json({ noitemsfound: "No items found" })
    );
});

// @route api/items/:id
// @description Get single item by id
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) =>
      res.status(404).json({ noitemfound: "No such item" })
    );
});

// @route api/items/:id
// @description Update item
router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route api/items/:id
// @description Delete item by id
router.delete("/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id, req.body)
    .then((item) => res.json({ msg: "Item entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such item" }));
});

module.exports = router;
