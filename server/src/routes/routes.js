import { Router } from "express";
import { loginUser, userRegister } from "../controllers/user.controllers.js";
const router=Router()

router.route('/')
router.route('/register').post(userRegister)
router.route('/login').post(loginUser)
export default router