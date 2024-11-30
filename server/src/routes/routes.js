import { Router } from "express";
import { getMovieReply, getMovieReviews, getUserDetails, loginUser, 
    logOutUser, 
    movieIsLiked, 
    movieLike, 
    movieLikeCount, 
    refreshAccessToken, 
    reviewDelete, 
    reviewEdit, 
    reviewReply, 
    updateEmail, 
    updatePassword, 
    updateUserName, 
    uploadProfileImage, 
    userActivity, 
    userRegister, 
    userReview,
    watchlist,
    watchListCheck,
}

    from "../controllers/user.controllers.js";
import { verificationCode, verifyEmail } from "../controllers/verify.controllers.js";
import verifyJWT from "../middleware/Auth.middleware.js";
import {upload} from "../middleware/Multer.middleware.js"
import { removeProfileImage } from "../controllers/profile.controller.js";
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
router.route("/movie-likes-count").post(movieLikeCount)
router.route("/update-profile-image").post(verifyJWT,
    upload.single('profileImage'),
    uploadProfileImage
)
router.route('/watch-list/:movieId').get(verifyJWT,watchListCheck)
router.route("/delete-review").post(verifyJWT,reviewDelete)
router.route('/edit-review').post(verifyJWT,reviewEdit)
router.route('/add-to-watchlist').post(verifyJWT,watchlist)
router.route('/get-user-activity').get(verifyJWT,userActivity)
router.route('/add-reply').post(verifyJWT,reviewReply)
router.route('/movie-reply').post(verifyJWT,getMovieReply)
router.route('/remove-profile-image').post(verifyJWT,removeProfileImage)
router.route('/send-verification-code').post(verifyJWT,verificationCode)
router.route('/verify-email').post(verifyJWT,verifyEmail)
export default router