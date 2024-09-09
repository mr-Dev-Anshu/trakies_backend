import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";
const app = express();
app.use(express.json());
dotenv.config({
  path: "./.env",
});
app.use("/api/users", userRouter);
export { app };
