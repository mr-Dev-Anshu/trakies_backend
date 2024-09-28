import mongoose from "mongoose";
const schema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
  },
  age: {
    type: String,
  },
  gender: {
    type: String, 
  },
  contact: {
    type: String,
  },
  emergency_contact: {
    type: String,
  },
  id_number: {
    type: String,
  },
  id_type:{
     type:String 
  } , 
  address: {
    type: String,
  },
});
const UserProfile = mongoose.model("user_profile", schema);
export default UserProfile;
