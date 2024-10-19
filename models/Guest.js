import mongoose from "mongoose";
const guestSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
