import { Router } from "express";
import {
  createIncluded,
  createNotIncluded,
  createTour,
  getAllTours,
  getIncluded,
  getNotIncluded,
  getTourById,
  updateTour,
} from "../controllers/tour.controller.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/create-tour").post(checkAdminRole, createTour);
router.route("/get-alltours").get(getAllTours);
router.route("/get-tour").get(getTourById);
router.route("/update-tour").post(updateTour);
router.route("/create-included").post(checkAdminRole, createIncluded);
router.route("create/notincluded").post(checkAdminRole, createNotIncluded);
router.route("/get-included").get(getIncluded);
router.route("/get-notincluded").get(getNotIncluded);
export default router;
