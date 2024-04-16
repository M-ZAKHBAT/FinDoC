import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    // console.log("All Reviews:", reviews);
    res
      .status(200)
      .json({ success: true, message: "successful", data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// Create review
export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) {
    // console.log("User ID:", req.params.userId);
    req.body.user = req.userId;
  }

  const newReview = new Review(req.body);
  // console.log("New Review Data:", newReview);
  try {
    const savedReview = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
