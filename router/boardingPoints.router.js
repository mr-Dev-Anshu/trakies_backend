import { Router } from "express";
import { addBoardingPoint, deleteBoardingPoint, getBoardingPointById, getBoardingPointsByTransportId, updateBoardingPoint } from "../controllers/bordingPoints.js";

const router = Router() ; 

router.route("/create").post(addBoardingPoint)  ; 
router.route("/get").get(getBoardingPointsByTransportId) ; 
router.route("/update").post(updateBoardingPoint) ; 
router.route("/delete").delete(deleteBoardingPoint); 
router.route("/getById").get(getBoardingPointById)


export default router ; 
