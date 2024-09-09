import { Router } from "express";
import { logout, signin, signup } from "../controllers/user.controller.js";
const router = Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route('/logout').post(logout)
export default router;