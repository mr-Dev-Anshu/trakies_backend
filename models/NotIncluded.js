import mongoose from "mongoose";

const schema =  mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  item: {
    type: [String],
    required: true,
  },
});

const NotIncluded = mongoose.model("NotIncluded", schema);
export default NotIncluded;
