const express = require("express");
const router = express.Router();

const { getUserById, getUser , getAllUsers,  } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin,image } = require("../controllers/auth");

router.param("userId", getUserById);

// get All user 
router.get("/users", getAllUsers);
router.get("/user/image/:userId", image)
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;
