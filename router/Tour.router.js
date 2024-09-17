import { Router } from "express";
import { createTour, getAllTours, getTourById } from "../controllers/Tour";
const router = Router() ; 
router.route("/create").post(createTour)
router.route("/getAllTours").post(getAllTours) 
router.route("getOneTour").post(getTourById) ; 
export  {router}