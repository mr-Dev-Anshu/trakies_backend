import mongoose from "mongoose";
const schema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const Post = mongoose.model("Post", schema);
export default Post;
