import { Router } from "express";
import { createAllcatedTransport, getAllcatedTransport, deleteAllcatedTransport } from "../controllers/allocatedTransport.js";

const router = Router();

router.route("/create").post(createAllcatedTransport);
router.route("/get").get(getAllcatedTransport);
router.route("/delete").delete(deleteAllcatedTransport);

export default router; 