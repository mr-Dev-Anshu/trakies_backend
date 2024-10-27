import { Router } from "express";
import {
  addNotIncludedItem,
  deleteNotIncludedItem,
  getAllNotIncludedItems,
  updateNotIncludedItem,
} from "../controllers/Included&NotIncluded.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";

const router = Router();

router.route("/add").post(checkAdminRole, addNotIncludedItem);
router.route("/update").post(updateNotIncludedItem);
router.route("/delete").delete(checkAdminRole, deleteNotIncludedItem);
router.route("/get").get(getAllNotIncludedItems);

export default router;
