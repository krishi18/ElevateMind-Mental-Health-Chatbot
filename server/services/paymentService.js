import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

module.exports = {
  handlePaymentSuccess: async (req, res, next) => {
    const event = req.body;

    try {
      if (event.type === "payment_intent.succeeded") {
        // Handle successful payment
        const paymentIntent = event.data.object;
        // Update the transaction in the database
      }
      res.send({ received: true });
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  },
};