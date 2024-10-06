import mongoose from "mongoose";

const schema = mongoose.Schema({
  track_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const TourLead = mongoose.model("TourLead", schema);
export default TourLead;
