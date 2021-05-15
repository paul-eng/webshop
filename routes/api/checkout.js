const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IpjCXLDGBjqGrZiSv4css572H8bklS3aBtbLtmuL1a0SpTkjYNmPjg1usj2s8TE6mYNHiI73MizvmvtMhImPnoe00bBAALnNc"
);

router.get("/test", (req, res) => {
  res.json("This is a test");
});

// @route api/users/checkout/:payment_method_id
// @description retrieve data about payment method (card brand, last 4 digits etc)
router.get("/:paymethod", async (req,res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      req.params.paymethod
    );
    res.send(paymentMethod)
  } catch (err) {
    console.log(err)
  }
})

// @route api/users/checkout
// @description integration with stripe API
router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amt * 100,
      currency: "usd",
      description: req.body.lineitems
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
