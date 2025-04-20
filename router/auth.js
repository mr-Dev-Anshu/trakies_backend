import { Router } from "express";
import { login , verify  } from "../controllers/user.js";
const router = Router() ; 

router.route('/login').post(login); 
router.route('/verify').post(verify);

export default router ; 