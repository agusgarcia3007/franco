import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  employeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  rating: Number,
  created_at: { type: Date, default: Date.now },
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
