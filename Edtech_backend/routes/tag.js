const express = require("express");
const router = express.Router();
const {Course} = require("../models/course")

const {getTagById , createTag, getAllTags, listOfCoursesTagName}= require("../controllers/tag")
const {isSignedIn , isAdmin , isAuthenticated}= require("../controllers/auth")
const {getUserById}= require("../controllers/user")


///  middleware Routes 
router.param("userId", getUserById);
router.param("tagId", getTagById)


/// Post Routes
router.post("/tag/create/:userId",isSignedIn ,isAuthenticated, isAdmin , createTag)


// Test This Route on Postamn Please  
router.get("/tag/coursesbytagname", listOfCoursesTagName)

router.get("/tags", getAllTags)




module.exports = router;