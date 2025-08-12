import mongoose  from "mongoose";

const schema = mongoose.Schema({
       email:{
         type:String , 
         required:true , 
       }, 
       password:{
         type:String , 
         required:true
       },
       role:{
         type:String,
         default:"superadmin"
       }
});
export const Admin =  mongoose.model('Admin' , schema) ; 