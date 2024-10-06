import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});

export const Image = mongoose.model("Image", schema);