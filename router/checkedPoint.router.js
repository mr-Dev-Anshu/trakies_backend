import { Router } from "express";
import { addCheckedPoint, getCheckedPoints } from "../controllers/checkedPoint.controller.js";

const router = Router() ; 

router.route("/add").post(addCheckedPoint); 
router.route("/get").get(getCheckedPoints);

export default router ; 