const express = require("express");
const router = express.Router();

const {createUserLogs, getUserLogId, UserLogins} = require("../controllers/userlogs");


const { isSignedIn, isAuthenticated, isAdmin, image } = require("../controllers/auth");
const {getUserById}= require("../controllers/user")


//MiddleWare Route 
router.param("userId", getUserById);
router.param("userLogId", getUserLogId);

//Post Route
router.post("/userlogs/:userId",isSignedIn, isAuthenticated, isAdmin, createUserLogs)

// Test This please on postman
//Get Route 
router.post("/userlogins/:userId", UserLogins)




module.exports = router;
