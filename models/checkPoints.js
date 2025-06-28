import mongoose from "mongoose";
const checkPointSchema = new mongoose.Schema(
  {
    tourId:{
       type:mongoose.Schema.Types.ObjectId , 
       ref:"Tour",
       required:true 
    }, 
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum:["Qr Code" , "Geo Tagging"],
      required: true, 
      trim: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const CheckPoint = mongoose.model("CheckPoint", checkPointSchema);
export default CheckPoint;