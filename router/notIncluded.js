import { Router } from "express";
import {
  addNotIncludedItem,
  deleteNotIncludedItem,
  getAllNotIncludedItems,
  updateNotIncludedItem,
} from "../controllers/Included&NotIncluded.js";

const router = Router();

router.route("/add").post(addNotIncludedItem);
router.route("/update").post(updateNotIncludedItem);
router.route("/delete").delete(deleteNotIncludedItem);
router.route("/get").get(getAllNotIncludedItems)

export default router;
