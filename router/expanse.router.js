import { Router } from "express";
import { addExpance, getExpanses, updateExpanse } from "../controllers/expanse.controller.js";

const router = Router() ; 

router.route("/add-expanse").post(addExpance) ; 
router.route("/get-expanses").get(getExpanses) ; 
router.route("/update-expanse").post(updateExpanse) ; 
export default router