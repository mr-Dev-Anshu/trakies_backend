import { Router } from "express";
import {
  createCheckPoint,
  deleteCheckPoint,
  getAllCheckPoints,
  getLatestUnCheckedPoint,
  updateCheckPoint,
} from "../controllers/checkPoint.controller.js";
import { getAllCheckPointAndCheckedUser } from "../controllers/checkedPoint.controller.js";

const router = Router();

router.route("/create-point").post(createCheckPoint);
router.route("/update-point").post(updateCheckPoint);
router.route("/delete-point").delete(deleteCheckPoint);
router.route("/get-points").get(getAllCheckPoints);
router.route("/get-points-ByTourId").get(getAllCheckPointAndCheckedUser)
router.route("/get-latestUnchecked").get(getLatestUnCheckedPoint)
export default router; 