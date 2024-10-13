import { Router } from "express";
import { createNotification, getNotifications, updateNotification } from "../controllers/notification.controller.js";

const router = Router () ; 

router.route("/create").post(createNotification) ; 
router.route("/update").post(updateNotification);
router.route("/get").get(getNotifications) ; 

export default router ; 