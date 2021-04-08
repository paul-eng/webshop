const express = require("express");
const router = express.Router();

// Load Product model
const Product = require("../../models/Product");

// @route api/products/test
router.get("/test", (req, res) => res.send("product route testing!"));

// @route api/products
// @description add/save product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => res.json({ msg: "Product added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this product", err })
    );
});

// @route api/products
// @description Get all products
router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({ noproductsfound: "No products found" })
    );
});

// @route api/products/:id
// @description Get single product by id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No such product" })
    );
});

// @route api/products/:id
// @description Update product
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then((product) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route api/products/:id
// @description Delete product by id
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, req.body)
    .then((product) => res.json({ msg: "Product entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such product" }));
});

module.exports = router;
