import mongoose from "mongoose";

const schema = mongoose.Schema({
    tourId:{
       type:mongoose.Schema.Types.ObjectId , 
       ref:"Tour", 
       required:true   
    }, 
     email:{
         type:String , 
         required:true 
     }, 
     checkPointId:{
         type:mongoose.Schema.Types.ObjectId  , 
         ref:"CheckPoint", 
         required:true
     }
}); 

const CheckedPoint = mongoose.model("CheckedPoint" , schema)

export default CheckedPoint ; 