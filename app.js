import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";
import { putObject } from "./controllers/s3bucket.js";
import memberRouter from "./router/member.router.js";
import { tourRouter } from "./router/Tour.router.js";
import postRouter from "./router/post.router.js";
import imageRouter from "./router/image.router.js";
import cors from "cors";
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
app.use("/api/tour", tourRouter);
app.use("/api/member", memberRouter);
app.post("/api/putObject", putObject);
app.use("/api/Post", postRouter);
app.use("/api/image", imageRouter);
export { app };



