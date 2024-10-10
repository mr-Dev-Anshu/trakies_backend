import mongose from "mongoose";

const schema = mongose.Schema(
  {
    tour_id: {
      type: mongose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    date:{
       type:Date , 
       required:true
    } , 
    receipt:{
         type:String 
    }
  },
  { timestamps: true }
);
const Expanse  = mongose.model("Expanse", schema);
export default Expanse;