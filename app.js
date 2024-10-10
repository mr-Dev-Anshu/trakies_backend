import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";
import { putObject } from "./controllers/s3bucket.js";
import memberRouter from "./router/member.router.js";
import postRouter from "./router/post.router.js";
import imageRouter from "./router/image.router.js";
import cors from "cors";
// import  TourRouter  from "./router/tour.router.js";
import TrackLeadRouter from "./router/trackLead.router.js"
import ExpanseRouter from "./router/expanse.router.js"
import TourRouter from "./router/tour.js"
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
dotenv.config({
  path: "./.env",
});
app.use(cors(corsOptions));
app.use("/api/users", userRouter);
app.use("/api/tour", TourRouter);
app.use("/api/member", memberRouter);
app.post("/api/putObject", putObject);
app.use("/api/Post", postRouter);
app.use("/api/image", imageRouter);
app.use("/api/lead" , TrackLeadRouter); 
app.use("/api/expanse" , ExpanseRouter)
export { app };