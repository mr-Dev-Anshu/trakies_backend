import { Router } from "express";
import { createAccommodation, getAccommodationById, getAccommodations } from "../controllers/accommodation.controller";



const router = Router() ; 

router.route("/create-accommodation").post(createAccommodation) ;
router.route("/get-accommodations").get(getAccommodations) ; 
router.route("/get-accommodation").get(getAccommodationById) ; 
// router.route("/update")