import { Router } from "express";
import { addExpance, deleteExpanse, getExpanses, updateExpanse } from "../controllers/expanse.controller.js";

const router = Router() ; 

router.route("/add-expanse").post(addExpance) ; 
router.route("/get-expanses").get(getExpanses) ; 
router.route("/update-expanse").post(updateExpanse) ; 
router.route("/delete-expanse").delete(deleteExpanse);
export default router