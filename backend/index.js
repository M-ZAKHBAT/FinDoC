import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
// import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
// const __dirname = path.resolve();
const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is Working");
});

//database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase Connected");
  } catch (err) {
    console.log("ERROR DataBase Failed");
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   // Specify the path to the index.html file
//   // Send the index.html file as the response
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

app.listen(port, () => {
  connectDB();
  console.log("server is running on port " + port);
});
