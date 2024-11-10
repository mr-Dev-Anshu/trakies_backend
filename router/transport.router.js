import { Router } from "express";
import { createTransport, deleteTransport, getTransport, updateTransport } from "../controllers/transport.js";

const router = Router() ; 

router.route("/create").post(createTransport); 
router.route("/get").get(getTransport) ; 
router.route("/update").post(updateTransport); 
router.route("/delete").delete(deleteTransport) ; 

export default router ; 