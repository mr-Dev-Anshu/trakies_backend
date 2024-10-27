import { Router } from "express";
import { addIncludedItem, deleteIncludedItem, getAllIncludedItems, updateIncludedItem } from "../controllers/Included&NotIncluded.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";

const router = Router() ; 

router.route("/add").post( checkAdminRole ,  addIncludedItem); 
router.route("/update").post(updateIncludedItem); 
router.route("/delete").delete( checkAdminRole , deleteIncludedItem) ; 
router.route("/get").get(getAllIncludedItems)
export default router ; 

