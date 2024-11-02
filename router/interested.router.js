import { Router } from "express";
import { createInterested, deleteInterested, getInterestedByTourId, updateInterested } from "../controllers/interested.controller.js";

const router = Router() ; 

router.route("/create").post(createInterested) ; 
router.route("/update").post(updateInterested) ; 
router.route("/delete").delete(deleteInterested) ; 
router.route("/get").get(getInterestedByTourId) ; 

export default router ; 