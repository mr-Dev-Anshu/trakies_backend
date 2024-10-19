import mongoose from "mongoose";

const schema = mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  item: {
    type: [String],
    required:true 
  },
});

const Included = mongoose.model("Included", schema);
export default Included;
