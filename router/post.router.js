import { Router } from "express";
import {
  create,
  deletePost,
  getPosts,
} from "../controllers/post.controller.js";
const router = Router();
router.route("/create").post(create);
router.route("/delete").post(deletePost);
router.route("/get").get(getPosts);
export default router;