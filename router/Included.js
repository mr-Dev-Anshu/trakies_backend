import { Router } from "express";
import { addIncludedItem, deleteIncludedItem, getAllIncludedItems, updateIncludedItem } from "../controllers/Included&NotIncluded.js";

const router = Router() ; 

router.route("/add").post(addIncludedItem); 
router.route("/update").post(updateIncludedItem); 
router.route("/delete").delete(deleteIncludedItem) ; 
router.route("/get").get(getAllIncludedItems)
export default router ; 

