import { Router } from "express";
import { getMovieReviews, getUserDetails, loginUser, 
    logOutUser, 
    movieIsLiked, 
    movieLike, 
    movieLikeCount, 
    refreshAccessToken, 
    updateEmail, 
    updatePassword, 
    updateUserName, 
    userRegister, 
    userReview,
}

    from "../controllers/user.controllers.js";
import verifyJWT from "../middleware/Auth.middleware.js";
const router=Router()

router.route('/')
router.route('/register').post(userRegister)
router.route('/login').post(loginUser)
router.route('/logOut').post(verifyJWT,logOutUser)
router.route('/refresh-Token').post(refreshAccessToken)
router.route('/user-review').post(verifyJWT,userReview)
router.route('/current-user-details').get(verifyJWT,getUserDetails)
router.route('/movie-reviews').post(getMovieReviews)
router.route('/update-username').post(verifyJWT,updateUserName)
router.route('/update-email').post(verifyJWT,updateEmail)
router.route('/update-password').post(verifyJWT,updatePassword)
router.route('/movie-like').post(verifyJWT,movieLike)
router.route('/movie-is-liked/:movieId').get(verifyJWT,movieIsLiked)
router.route("/movie-likes-count").post(verifyJWT,movieLikeCount)
export default router