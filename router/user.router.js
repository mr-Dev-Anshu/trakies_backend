import { Router } from "express";
import {
  logout,
  signin,
  signup,
  updateUserProfile,
  createUserProfile,
  getUserProfile,
  getAllUsers,
  deleteUser
} from "../controllers/user.controller.js";
import { checkSuperAdmin } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/signup").post(checkSuperAdmin, signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);
router.route("/get-all").get(checkSuperAdmin, getAllUsers)
router.route("/delete").delete(checkSuperAdmin, deleteUser);
router.route("/createProfile").post(createUserProfile);
router.route("/updateProfile").post(updateUserProfile);
router.route("/getProfile").get(getUserProfile);
export default router;
