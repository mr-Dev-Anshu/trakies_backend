import { Router } from "express";
import {
  logout,
  signin,
  signup,
  updateUserProfile,
  createUserProfile,
  getUserProfileBy,
} from "../controllers/user.controller.js";
const router = Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);
router.route("/createProfile").post(createUserProfile);
router.route("/updateProfile").post(updateUserProfile);
router.route("/getProfile").post(getUserProfileBy);
export default router;