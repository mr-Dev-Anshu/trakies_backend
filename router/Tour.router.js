import { Router } from "express";
import {
  createTour,
  getAllTours,
  getTourById,
} from "../controllers/tour.controller.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const tourRouter = Router();
tourRouter.route("/create-tour").post(checkAdminRole, createTour);
tourRouter.route("/get-alltours").get(getAllTours);
tourRouter.route("/get-tour").get(getTourById);
export { tourRouter };