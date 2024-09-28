import { Router } from "express";
import {
  logout,
  signin,
  signup,
  updateUserProfile,
  createUserProfile,
  getUserProfileBy,
} from "../controllers/user.controller.js";
import { checkSuperAdmin } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/signup").post( checkSuperAdmin ,  signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);
router.route("/createProfile").post(createUserProfile);
router.route("/updateProfile").post(updateUserProfile);
router.route("/getProfile").get(getUserProfileBy);
export default router;