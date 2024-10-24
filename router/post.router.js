import { Router } from "express";
import {
  create,
  deletePost,
  getPostById,
  getPosts,
} from "../controllers/post.controller.js";
const router = Router();
router.route("/create-post").post(create);
router.route("/delete-post").delete(deletePost);
router.route("/get-posts").get(getPosts);
router.route("/get-post").get(getPostById)
export default router;  