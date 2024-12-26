import { Router } from "express";
import {
  logout,
  signin,
  signup,
  updateUserProfile,
  createUserProfile,
  getUserProfile,
} from "../controllers/user.controller.js";
import { checkSuperAdmin } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);
router.route("/createProfile").post(createUserProfile);
router.route("/updateProfile").post(updateUserProfile);
router.route("/getProfile").get(getUserProfile);
export default router;
