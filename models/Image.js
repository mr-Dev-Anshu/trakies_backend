import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  typeId:{
     type:String 
  }
});
export const Image = mongoose.model("Image", schema);