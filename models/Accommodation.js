import mongoose from "mongoose";
const accommodationSchema = new mongoose.Schema(
  {
    guestHouseName: {
      type: String,
      required: true,
      trim: true,
    },
     tourId:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Tour", 
        required:true
     },  
    location: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfRoom:{
      type:Number , 
      required:true 
    } , 
    totalOccupancy:{
       type:Number , 
       required:true 
    }
  },
  {
    timestamps: true,
  }
);
const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;