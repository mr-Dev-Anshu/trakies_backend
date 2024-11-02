import { Router } from "express";
import { createAllocatedAccommodation, deleteAllocatedAccommodation, getAllocatedAccommodationsByTourId } from "../controllers/allocatedAccommodation.js";

const router = Router() ;

router.route("/create").post(createAllocatedAccommodation); 
router.route("/get").get(getAllocatedAccommodationsByTourId) ; 
router.route("/delete").delete(deleteAllocatedAccommodation) ; 

export default router ; 