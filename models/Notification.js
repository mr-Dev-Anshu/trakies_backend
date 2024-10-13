import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  id: {
    type: String,
  },
},
{timestamps:true }
);

const Notification = mongoose.model("Notification", schema);
export default Notification;
