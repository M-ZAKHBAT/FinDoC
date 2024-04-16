import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    console.log("UserID:", req.userId);
    const doctor = await Doctor.findById(req.params.doctorId);
    console.log("Doctor:", doctor);
    const user = await User.findById(req.userId);
    console.log("User:", user);
    if (!user || !user.email) {
      throw new Error("User not found or user email is not defined");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Conversion de ৳ en USD
    const bdtToUsdExchangeRate = 0.0118; // Exemple de taux de change (à adapter)

    // Calcul du montant en cents en USD, avec un minimum de 50 cents
    const ticketPriceInCents = Math.max(
      doctor.ticketPrice * bdtToUsdExchangeRate * 100,
      50
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd", // Changement de devise en USD
            unit_amount: ticketPriceInCents,
            product_data: {
              name: user.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });

    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully Paid", session });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error Creating checkout session" });
  }
};
