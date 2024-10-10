import { Router } from "express";
import { addMember, deleteMembers, getMembers } from "../controllers/member.controller.js";
const router = Router()  ; 
router.route('/add-member').post(addMember) ; 
router.route('/get-member').get(getMembers) ; 
router.route('/delete-member').delete(deleteMembers) ; 
// router.route("/get-member").get((req  , res )=> {
//        console.log("This is for testing  ")
   
//         res.json("this is comming from same route ")
       
// }) ; 
export default router ; 