import { Router } from "express";
import {
  create,
  deletePost,
  getPosts,
} from "../controllers/post.controller.js";
const router = Router();
router.route("/create-post").post(create);
router.route("/delete-post").delete(deletePost);
router.route("/get-post").get(getPosts);
export default router;  