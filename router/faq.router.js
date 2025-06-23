import { Router } from "express";
import { createFAQ, deleteFAQ, getAllFAQs, updateFAQ } from "../controllers/faq.js";

const router = Router();

router.route("/get").get(getAllFAQs) ; 
router.route("/update").put(updateFAQ) ;
router.route("/delete").delete(deleteFAQ); 
router.route("/create").post(createFAQ) ;

export default router;