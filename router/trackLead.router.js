import { Router } from "express";
import { createTourLead,  getAllTour } from "../controllers/TrackLead.controller.js";

const router = Router() ; 

router.route("/create-lead").post(createTourLead) ; 
router.route("/get-tour").get(getAllTour)  ; 

export default router  ; 
