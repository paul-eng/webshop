const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const util = require("./route_util");

const pagesize = 6;

// @route api/items/test
router.get("/test", (req, res) => {
  let { sort, paginate, p, query } = util.getValues(req);
  Item.find({ ...query }, "name category brand price gallery pathname")
    //sort by requested field, then alphabetically within field
    .sort(`${sort} brand name`)
    .skip(p * pagesize)
    .limit(paginate && pagesize)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});
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
// @read all items
router.get("/", (req, res) => {
  let { sort, paginate, p, query } = util.getValues(req);
  let operators = util.getOperators(sort, paginate, p, pagesize);
  Item.aggregate([
    { $match: { ...query } },
    { $sort: { brand: 1, name: 1 } },
    {
      $facet: {
        results: [{ $count: "count" }],
        items: [...operators],
      },
    },
  ])
    .then((data) => res.json(data[0]))
    .catch((err) => res.status(404).json({ error: `mongoError ${err.code}` }));
});

// @route api/items/search
// @read based on text match
router.get("/search", (req, res) => {
  let terms = req.query.searchTerms.map((term) => `"${term}"`).join(" ");
  delete req.query.searchTerms;
  let { sort, paginate, p, query } = util.getValues(req);
  Item.find({ $text: { $search: terms }, ...query })
    .sort(`${sort}`)
    .skip(p * pagesize)
    .limit(paginate && pagesize)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route api/items/new
// @read recent items
router.get("/new", (req, res) => {
  let { sort, paginate, p, query } = util.getValues(req);
  let operators = util.getOperators(sort, paginate, p, pagesize);
  let pipeline = [
    { $sort: { updated_date: -1 } },
    { $limit: 15 },
    { $match: { ...query } },
    {
      $facet: {
        results: [{ $count: "count" }],
        items: [...operators],
      },
    },
  ];
  Item.aggregate(pipeline)
    .then((data) => res.json(data[0]))
    .catch((err) => res.status(404).json({ error: `mongoError ${err.code}` }));
});

// @route api/items/brands
// @read all brand names
router.get("/brands", (req, res) => {
  Item.aggregate([{ $group: { _id: "$brand" } }])
    .then((brands) => res.json(brands))
    .catch((err) => res.status(404).json({ nobrandsfound: "No brands found" }));
});

// @route api/items/brand/:brand
// @read items by brand
router.get("/brand/:brand", (req, res) => {
  let { sort, paginate, p, query } = util.getValues(req);
  Item.find(
    { brand: { $regex: `${req.params.brand}`, $options: `i` }, ...query },
    "name category brand price gallery pathname"
  )
    //sort by requested field, then alphabetically within field
    .sort(`${sort} name`)
    .skip(p * pagesize)
    .limit(paginate && pagesize)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route api/items/categories
// @read all category types
router.get("/categories", (req, res) => {
  Item.aggregate([{ $group: { _id: "$category" } }])
    .then((cats) => res.json(cats))
    .catch((err) =>
      res.status(404).json({ nocatsfound: "No categories found" })
    );
});

// @route api/items/category/:cat
// @read items by category
router.get("/category/:cat", (req, res) => {
  let { sort, paginate, p, query } = util.getValues(req);
  Item.find(
    { category: { $regex: `${req.params.cat}`, $options: `i` }, ...query },
    "name category brand price gallery pathname"
  )
    //sort by requested field, then alphabetically within field
    .sort(`${sort} brand name`)
    .skip(p * pagesize)
    .limit(paginate && pagesize)
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route api/items/:item
// @read one item
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
