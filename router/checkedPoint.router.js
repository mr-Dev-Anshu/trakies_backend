import { Router } from "express";
import { addCheckedPoint, deleteCheckedPoint, getAllCheckedUserByCheckPointId, getCheckedPoints, resetCheckedPoints } from "../controllers/checkedPoint.controller.js";

const router = Router() ; 

router.route("/add").post(addCheckedPoint); 
router.route("/get").get(getCheckedPoints);
router.route("/getUserById").get(getAllCheckedUserByCheckPointId) ; 
router.route("/delete").delete(deleteCheckedPoint); 
router.route("/reset").delete(resetCheckedPoints)
export default router ; 