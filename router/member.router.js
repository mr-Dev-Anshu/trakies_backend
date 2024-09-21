import { Router } from "express";
import { addMember, getMembers } from "../controllers/member.controller.js";

const router = Router()  ; 

router.route('/add').post(addMember) ; 
router.route('/get').get(getMembers) ; 
export default router ; 
