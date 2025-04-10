import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const dbConnection = async () => {
  try {
	  console.log(process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Indore_hackathon",
    });
    console.log("DataBase got connected ");
  } catch (error) {
    console.log("Data base connection failed! ", error);
  }
};
export default dbConnection;


