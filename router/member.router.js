import { Router } from "express";
import { addMember, getMembers } from "../controllers/member.controller.js";

const router = Router()  ; 

router.route('/add-member').post(addMember) ; 
router.route('/get-member').get(getMembers) ; 
export default router ; 