const express = require("express");
const router = express.Router();


const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById}= require("../controllers/user")
const {getUserEnrollemntId, UserEnrollment} = require("../controllers/userEnrollment");



//Middleware Route 
router.param("/userEnrollmentId", getUserEnrollemntId)
router.param("userId", getUserById);



//Post Route
router.post("/userenrollment/:userId",isSignedIn,isAuthenticated, UserEnrollment)


module.exports = router;