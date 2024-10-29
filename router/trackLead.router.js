import { Router } from "express";
import { createTourLead,  getAllTour, getTrekLeads } from "../controllers/TrackLead.controller.js";

const router = Router() ; 

router.route("/create-lead").post(createTourLead) ; 
router.route("/get-tour").get(getAllTour); 
router.route("/get-leads").get(getTrekLeads) ; 
export default router  ; 
