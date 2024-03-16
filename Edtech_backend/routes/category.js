const express = require("express");
const router = express.Router();

const {getCategoryById , createCategory, mostEnrolledCategories ,getAllCategories, image}= require("../controllers/category")
const {isSignedIn , isAdmin , isAuthenticated, }= require("../controllers/auth")
const {getUserById}= require("../controllers/user")


///  middleware Routes 
router.param("userId", getUserById);
router.param("categoryId", getCategoryById)


/// Post Routes
router.post("/category/create/:userId", createCategory)

/// Get Route 
router.get("/category/mostenrolledcategory",  mostEnrolledCategories)
router.get("/categories", getAllCategories)

router.get("/category/image/:categoryId", image)





module.exports = router;