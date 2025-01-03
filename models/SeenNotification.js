import mongoose from "mongoose";

const schema = mongoose.Schema({
     email:{
         type:String , 
         required:true 
     } , 
     notificationId:{
         type:mongoose.Schema.Types.ObjectId  , 
         ref:"Notification", 
         required:true
     }
})


const SeenNotification = mongoose.model("SeenNotification" , schema)

export default SeenNotification ; 