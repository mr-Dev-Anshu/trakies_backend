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

const BackPack = mongoose.model("BackPack", schema);
export default BackPack;
