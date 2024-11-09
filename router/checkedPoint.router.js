import { Router } from "express";
import { addCheckedPoint, deleteCheckedPoint, getAllCheckedUserByCheckPointId, getCheckedPoints } from "../controllers/checkedPoint.controller.js";

const router = Router() ; 

router.route("/add").post(addCheckedPoint); 
router.route("/get").get(getCheckedPoints);
router.route("/getUserById").get(getAllCheckedUserByCheckPointId) ; 
router.route("/delete").delete(deleteCheckedPoint); 
export default router ; 