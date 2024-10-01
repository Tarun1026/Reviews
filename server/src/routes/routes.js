import { Router } from "express";
import { loginUser, 
    logOutUser, 
    refreshAccessToken, 
    userRegister, 
    userReview} 
    from "../controllers/user.controllers.js";
import verifyJWT from "../middleware/Auth.middleware.js";
const router=Router()

router.route('/')
router.route('/register').post(userRegister)
router.route('/login').post(loginUser)
router.route('/logOut').post(verifyJWT,logOutUser)
router.route('/refresh-Token').post(refreshAccessToken)
router.route('/user-review').post(verifyJWT,userReview)
export default router