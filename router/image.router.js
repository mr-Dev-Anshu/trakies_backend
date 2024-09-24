import { Router } from "express";
import { createImage, getImages } from "../controllers/image.controller.js";

const router = Router() ; 
router.route("/create").post(createImage) ; 
router.route("/get").get(getImages) ; 
export default router ; 