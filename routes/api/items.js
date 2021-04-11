const express = require("express");
const router = express.Router();

// Load Item model
const Item = require("../../models/Item");

// @route api/items/test
router.get("/test", (req, res) => res.send("item route testing!"));

// @route api/items
// @create
router.post("/", (req, res) => {
  Item.create(req.body)
    .then((item) => res.json({ msg: "Item added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this item", err })
    );
});

// @route api/items
// @read all
router.get("/", (req, res) => {
  //projection only returns necessary fields for faster loading
  Item.find({}, "name brand price gallery.0 pathname")
    //sort by requested field, then alphabetically within field
    .sort(`${req.query.sort} brand name`)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route api/items/brand/:brand
// @read by brand
router.get("/brand/:brand", (req, res) => {
  //projection only returns necessary fields for faster loading
  Item.find(
    { brand: { $regex: `${req.params.brand}`, $options: `i` } },
    "name brand price gallery.0 pathname"
  )
    //sort by requested field, then alphabetically within field
    .sort(`${req.query.sort} brand name`)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route api/items/category/:cat
// @read by category
router.get("/category/:cat", (req, res) => {
  //projection only returns necessary fields for faster loading
  Item.find(
    { category: { $regex: `${req.params.cat}`, $options: `i` } },
    "name brand price gallery.0 pathname"
  )
    //sort by requested field, then alphabetically within field
    .sort(`${req.query.sort} brand name`)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route api/items/:item
// @read one
router.get("/:item", (req, res) => {
  Item.findOne({ pathname: req.params.item })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ noitemfound: "No such item" }));
});

// @route api/items/:id
// @update
router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route api/items/:id
// @delete
router.delete("/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id, req.body)
    .then((item) => res.json({ msg: "Item entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such item" }));
});

module.exports = router;
