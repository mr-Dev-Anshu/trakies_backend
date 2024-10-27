import { Router } from "express";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controllers/notes.controller.js";

const router = Router() ; 

router.route("/create").post(createNotes) ; 
router.route("/delete").delete(deleteNotes) ; 
router.route("/get").get(getNotes) ; 
router.route("/update").post(updateNotes) ; 


export default router ; 
