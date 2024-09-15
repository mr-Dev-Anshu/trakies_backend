import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";
import { putObject } from "./controllers/s3bucket.js";
const app = express();
app.use(express.json());
dotenv.config({
  path: "./.env",
});
app.use("/api/users", userRouter);

app.post("/api/putObject", putObject) ; 
export { app };
