import mongoose from "mongoose";

const schema = mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

const CheckInBaggage = mongoose.model("CheckInBagage", schema);
export default CheckInBaggage;
