import { Router } from "express";
import { createImage, deleteImage, getImages } from "../controllers/image.controller.js";

const router = Router() ; 
router.route("/create-image").post(createImage) ; 
router.route("/get-image").get(getImages) ; 
router.route("/delete-image").delete(deleteImage) ;
export default router ; 