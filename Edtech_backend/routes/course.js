const express = require("express");
const router = express.Router();


const {getCourseById , createCourse , getAllCourses, photo} = require("../controllers/course")
const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

// Paramater Route()
router.param("userId", getUserById);
router.param("courseId", getCourseById)


//Post route 
router.post("/course/create/:userId",isSignedIn, isAuthenticated, isAdmin, createCourse)


//get routes 
router.get("/course/photo/:courseId", photo)
router.get("/courses", getAllCourses)




module.exports = router;