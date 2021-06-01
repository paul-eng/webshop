# Restful Goods

[Restful Goods][restful] is a MERN-stack e-commerce app using JWT authentication to persist sessions and secure CRUD operations. In addition to user and inventory data, its REST API serves third-party results from securely processing credit card transactions with the Stripe API. The UI was implemented with a mobile-first approach, and avoids excessive CSS flourishes to ensure a snappy and intuitive experience on all devices.

![home]

## Summary

* Dynamically populated navigation categories and filter options
* Input validation for create / login account
* Order quantities confirmed against inventory before processing
* Successful Stripe transaction creates viewable order history object
* User managed address book for prepopulating order forms
* Permissions and guest cart data retained with expiring JWTs
* Private routing and admin access to control panel component

## Technical Details

#### MongoDB Facet Stage

Paginated product navigation requires a count of all relevant items, and retrieval of the currently rendered batch using the skip and limit operators. The facet stage of the aggregation pipeline helps us avoid the common pitfall of getting this information in two separate requests, by allowing multi-faceted processing that returns different dimensions of the same dataset.

```javascript
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
```

#### Stripe API Integration

When a payment is successfully processed and returned from the Stripe API, an order history object is added to a one-to-many relation with the user. While general data from an order history instance can be reviewed by the user from the account dashboard, a reference to the Stripe transaction ID is privately retained for administrative use.

![order]

#### Role Based Permissions

A component with administrator functions is rendered within the nav bar only if the corresponding role is found in the session JWT.

![admin]

The functions themselves are further protected with a higher-order component that will render a dead end with the wrong permissions. User pages (like the account dashboard) are wrapped in similar components that redirect to the home page.

```javascript
const AdminRoute = ({ user, component: Component, ...rest }) => {
  const [admin, setAdmin] = useState(false);
  const token = localStorage.getItem("session");

  useDispatch()(getAdmin(token)).then((res) => setAdmin(res));

  return (
    <Route
      {...rest}
      render={(props) => (admin ? <Component {...props} /> : null)}
    />
  );
};
```  

#### Managing Guest Sessions

While user carts are stored indefinitely with a one-to-one relation across MongoDB collections, guest items are retained in sessionStorage for 24 hours using an expiring JWT. When the site is mounted again, it will check for a preexisting token, and extend the timeframe by issuing a new one if it finds a valid session.

```javascript
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

If a user adds items to their cart as a guest, then logs in, the items are automatically merged into the cart retrieved from the database.

```javascript
export const mergeCarts = (target, source) => {
  let count = target.count;
  let total = target.total;
  let itemsA = source.items;
  let itemsB = target.items;

  let findsum = (stock) => {
    return stock.reduce((acc, val) => acc + val.qty, 0);
  };

  itemsA.forEach((item) => {
    let match = itemsB.find((i) => i.name === item.name);

    if (!match) {
      itemsB.push(item);
      let qty = findsum(item.stock);
      count = count + qty;
      total = total + qty * item.price;
    } else {
      item.stock.forEach((version) => {
        let vermatch = match.stock.find((v) => v.type === version.type);
        if (!vermatch) {
          match.stock.push(version);
        } else {
          vermatch.qty = vermatch.qty + version.qty;
        }
        count = count + version.qty;
        total = total + version.qty * item.price;
      });
    }
  });
  return {
    count,
    total,
    items: itemsB,
    qtyError: source.qtyError
      ? target.qtyError.concat(source.qtyError)
      : target.qtyError,
  };
};
```  


[restful]:  http://www.restfulgoods.com

[home]: ./docs/screen.png
[order]: ./docs/order.png
[admin]: ./docs/admin.png

