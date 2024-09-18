import { Router } from "express";
import { createTour, getAllTours, getTourById } from "../controllers/Tour.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const router = Router() ; 
router.route("/create").post( checkAdminRole , createTour)
router.route("/getAllTours").post(checkAdminRole , getAllTours) 
router.route("getOneTour").post(checkAdminRole , getTourById) ; 
export  default router ; 