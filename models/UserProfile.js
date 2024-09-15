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
  emergancy_contact: {
    type: String,
  },
  identity_proof: {
    type: String,
  },
  address: {
    type: String,
  },

  profile_img: {
    type: String,
  },
});
const UserProfile = mongoose.model("user_profile", schema);
export default UserProfile;
