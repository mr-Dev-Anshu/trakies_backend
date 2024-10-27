import { Router } from "express";
import {
  addBackPackItem,
  deleteBackPackItem,
  getAllBackPackItems,
} from "../controllers/backPack&checkInBaggage.controller.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";

const router = Router();

router.route("/add").post( checkAdminRole ,  addBackPackItem);
router.route("/delete").delete( checkAdminRole , deleteBackPackItem);
router.route("/get").get(getAllBackPackItems) ; 
export default router ; 