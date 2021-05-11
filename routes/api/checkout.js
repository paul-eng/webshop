const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IpjCXLDGBjqGrZiSv4css572H8bklS3aBtbLtmuL1a0SpTkjYNmPjg1usj2s8TE6mYNHiI73MizvmvtMhImPnoe00bBAALnNc"
);

router.get("/test", (req, res) => {
  res.json("This is a test");
});

// @route api/users/checkout
// @integration with stripe API
router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 200,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;