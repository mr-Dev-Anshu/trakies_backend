import { Router } from "express";
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
} from "../controllers/tour.controller.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/create-tour").post(checkAdminRole, createTour);
router.route("/get-alltours").get(getAllTours);
router.route("/get-tour").get(getTourById);
router.route("/update-tour").post(updateTour);
export default router;