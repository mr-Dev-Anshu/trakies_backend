import { Router } from "express";
import { createAccommodation, deleteAccommodation, getAccommodationById, getAllAccommodations, updateAccommodation } from "../controllers/accommodation.js";



const router = Router() ; 

router.route("/create").post(createAccommodation) ; 
router.route("/get").get(getAccommodationById); 
router.route("/getByTour").get(getAllAccommodations) ; 
router.route("/update").post(updateAccommodation) ; 
router.route("/delete").delete(deleteAccommodation) ; 

export default router ; 