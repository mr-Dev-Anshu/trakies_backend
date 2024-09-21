import { Router } from "express";
import { createTour, getAllTours, getTourById } from "../controllers/tour.controller.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const tourRouter  = Router();
tourRouter.route("/create").post(checkAdminRole, createTour);
tourRouter.route("/getAllTours").get(getAllTours);
tourRouter.route("/getTour").get(getTourById);
export  {tourRouter};   