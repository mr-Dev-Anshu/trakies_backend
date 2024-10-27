import { Router } from "express";
import {
  addCheckInBaggageItem,
  deleteCheckInBaggageItem,
  getAllCheckInBaggageItems,
} from "../controllers/backPack&checkInBaggage.controller.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";
const router = Router();
router.route("/add").post( checkAdminRole ,  addCheckInBaggageItem);
router.route("/delete").delete( checkAdminRole ,  deleteCheckInBaggageItem);
router.route("/get").get(getAllCheckInBaggageItems) ; 

export default router ; 