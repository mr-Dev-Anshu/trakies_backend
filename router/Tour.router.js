import { Router } from "express";
import { createTour, getAllTours, getTourById } from "../controllers/Tour.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/create").post(checkAdminRole, createTour);
router.route("/getAllTours").get(getAllTours);
router.route("getOneTour").post(getTourById);
export default router;