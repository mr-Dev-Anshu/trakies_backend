import mongoose from "mongoose";

const schema = mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});
const Notes = mongoose.model("Notes", schema);
export default Notes;
