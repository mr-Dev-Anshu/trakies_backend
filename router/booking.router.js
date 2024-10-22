import { Router } from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getMyTour, updateBooking } from "../controllers/booking.controller.js";

const router = Router() ; 


router.route("/add").post(createBooking)
router.route("/get").get(getAllBookings)
router.route("/getbyid").get(getBookingById)
router.route("/update").post(updateBooking) ; 
router.route("/delete").delete(deleteBooking) ; 
router.route("/get-my-tour").get(getMyTour); 


export default router ; 

