import { Router } from "express";
import { createAllocatedAccommodation, deleteAllocatedAccommodation, getAllocatedAccommodationsByAccommodationId, getAllocatedAccommodationsByTourId, getByRoomId } from "../controllers/allocatedAccommodation.js";
const router = Router();
router.route("/create").post(createAllocatedAccommodation);
router.route("/get").get(getAllocatedAccommodationsByTourId);
router.route("/delete").delete(deleteAllocatedAccommodation);
router.route("/getByAcco").get(getAllocatedAccommodationsByAccommodationId);
router.route('/getByRoom').get(getByRoomId)
export default router; 