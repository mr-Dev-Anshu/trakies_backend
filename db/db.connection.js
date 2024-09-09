import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Indore_hackathon",
    });
    console.log("DataBase got connected ");
  } catch (error) {
    console.log("Data base connection failed! ", error);
  }
};
export default dbConnection;