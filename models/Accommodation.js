import mongoose from "mongoose";
const accommodationSchema = new mongoose.Schema(
  {
    guestHouseName: {
      type: String,
      required: true,
      trim: true,
    },
    capecity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;
