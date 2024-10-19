import mongoose from "mongoose";
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    total_seats: {
      type: Number,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    tour_start: {
      type: Date,
      required: true,
    },
    tour_end: {
      type: Date,
      required: true,
    },
    booking_close: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    tour_cost: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
