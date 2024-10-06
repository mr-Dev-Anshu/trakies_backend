import { Router } from "express";
import { createImage, getImages } from "../controllers/image.controller.js";

const router = Router() ; 
router.route("/create-image").post(createImage) ; 
router.route("/get-image").get(getImages) ; 
export default router ; 