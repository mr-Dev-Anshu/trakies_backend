import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  occupancy: {
    type: String,
    enum: ["Single", "Double", "Triple", "Quad"],
    required: true,
  },
  guests: {
    type: [guestSchema],
    required: true,
  },
  roomType: {
    type: String,
    enum: ["AC", "Non-AC"],
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;