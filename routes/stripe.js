const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return { 
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name
            },
            unit_amount: item.price * 100 
          },
          quantity: item.quantity
        };
      }),
      success_url: "http://localhost:5173/success", 
      cancel_url: "http://localhost:5173/cancel"
    });
    res.json({ url:session.url });
    // res.json({msg:"payment success"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" }); // You may want to send an error response to the client.
  }
});

module.exports = router;

