import mongoose from "mongoose";
import DoctorSchema from "./DoctorSchema.js";
const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     model: "User",
//     select: "name photo",
//   });
//   next();
// });
reviewSchema.pre(/^find/, function (next) {
  console.log("Populating user and doctor fields...");
  this.populate({
    path: "user",
    model: "User",
    select: "name photo", // Peupler uniquement les champs nécessaires de l'utilisateur
  }).populate({
    path: "doctor",
    model: "Doctor",
    select: "name photo", // Peupler uniquement les champs nécessaires du médecin
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await DoctorSchema.findByIdAndUpdate(doctorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    // Aucune critique n'a encore été enregistrée pour ce médecin
    // Mise à jour des statistiques avec des valeurs par défaut
    await DoctorSchema.findByIdAndUpdate(doctorId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});
export default mongoose.model("Review", reviewSchema);
