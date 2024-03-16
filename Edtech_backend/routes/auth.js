var express = require("express");
var router = express.Router();
const { signout, signup, signin, image } = require("../controllers/auth");


router.get("/user/image/:userId", image)


router.post("/signup",signup);



//Post Route 
router.post("/signin",signin);


//Get Route 
router.get("/signout", signout);

module.exports = router;
