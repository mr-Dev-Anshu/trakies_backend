import { Router } from "express";
import { createTransport, deleteTransport,  getTransportById,  getTransportByTourId,  updateTransport } from "../controllers/transport.js";

const router = Router() ; 

router.route("/create").post(createTransport); 
router.route("/get").get(getTransportById) ; 
router.route("/update").post(updateTransport); 
router.route("/delete").delete(deleteTransport) ; 
router.route("/getByTourId").get(getTransportByTourId); 

export default router ; 