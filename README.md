# Restful Goods

[Restful Goods][restful] is a MERN-stack e-commerce app using JWT authentication to persist sessions and secure CRUD operations. In addition to user and inventory data, its REST API serves third-party results from securely processing credit card transactions with the Stripe API. The UI was implemented with a mobile-first approach, and avoids excessive CSS flourishes to ensure a snappy and intuitive experience no all devices.

![home]

## Summary

* Create account / login with validated inputs
* Cart information stored with encrypted and refreshed session tokens
* Automatically rendered low inventory alerts
* Orders quantities confirmed against inventory before processing
* Dynamically populated brands, categories, and filter options
* Search items by name, brand, or category
* User can store and edit addresses to prepopulate order forms
* View detailed account order history
* Admin access to private control panel


## Technical Details
To be updated

#### MongoDB Aggregation Pipeline Facet
```
let mongooseQuery = (req, res, pipeline) => {
  let { operators, filters } = util.getValues(req, pagesize);
  let match = pipeline.find((field) =>
    Object.keys(field).includes("$match")
  );
  match["$match"] = { ...match["$match"], ...filters };

  return Item.aggregate([
    ...pipeline,
    {
      $facet: {
        results: [{ $count: "count" }],
        items: [...operators],
      },
    },
  ])
    .then((data) => res.json(data[0]))
    .catch((err) => res.status(404).json({ error: `mongoError ${err.code}` }));
};
```

#### Stripe API Integration

#### Role Based Component Access

#### Refreshing Expired JWTs

```
router.post("/guest", (req, res) => {
  let newGuest = jwt.sign({ cart: req.body.cart }, config.get("secret"), {
    expiresIn: "1d",
  });
  res.json(newGuest);
});

// @route api/carts/guest
// @description Verify and retrieve guest cart jwt
router.get("/guest", (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.get("secret"), (err, decoded) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let refreshGuest = jwt.sign(
        { cart: decoded.cart },
        config.get("secret"),
        {
          expiresIn: "1d",
        }
      );
      res.json({ newToken: refreshGuest, cart: decoded.cart });
    }
  });
});
```  


[restful]:  http://www.restfulgoods.com

[home]: ./docs/screen.png

