import { Router } from "express";
import { logout, signin, signup , makeProfile  , getProfile } from "../controllers/user.controller.js";
const router = Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route('/logout').post(logout); 
router.route('/makeProfile').post(makeProfile);
router.route('/getProfile').post(getProfile); 
export default router;