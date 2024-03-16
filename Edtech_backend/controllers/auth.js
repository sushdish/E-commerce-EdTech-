const User = require("../models/user");
const {Userlogs} = require("../models/userlogs");
const formidable = require("formidable"); 
const multer = require("multer")
const _ = require("lodash");
const fs = require("fs")
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// For Multer 
// const storage = multer.diskStorage({
//   destination: "../upload/",
//   filename: function(req, file, cb){
//     cb(null, file.fieldname + '-' + Date.now() + 
//     path.extname(file.originalname))
//   }
// });

// const upload = multer({
//   storage: storage,
// })

// Signup Route 
exports.signup = async (req, res) => {

   try{
  //  const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(422).json({
  //     error: errors.array()[0].msg
  //   });
  // }
  //   let form = new formidable.IncomingForm();
  //   form.keepExtensions = true      //To Get Image Type like Jpeg/PNG
  
  //   form.parse(req, (err, fields, file) => {
  //     if(err){
  //         return res.status(400).json({
  //             error: "Problem with image"
  //         })
  //     }
  
  //     let user = new User(fields);
  //     const {name, email, password, country, city, language, education } = fields
  
  //     if (!name || !email || !password || !country || !city || !language || !education) {
  //         return res.status(400).json({
  //             error: "PLease include All field"
  //         })
  //     }
  
  
  // // Handle File
  // if(file.image){
  //     if(file.image.size > 3000000){
  //         return res.status(400).json({
  //             error: "File Size is too Big!"
  //         })
  //     }
  //     user.image.data = fs.readFileSync(file.image.path);
  //     user.image.contentType =file.image.type;
  
  // }
  const user = new User(req.body)
  user.save((err, user) => {
        if (err) {
          console.log('Error while saving in database', err);
          return res.status(400).json({
            err: "NOT able to save user in DB"
          });
        }
        res.json({
          Message: "You have Successfully Created Your Account",
          data: user});
      });
}  catch(e){
    console.log(e)
};
}

exports.image = (req, res , next) => {
  if (req.user.image.data) {
      res.set("Content-Type", req.user.image.contentType);
      return res.send(req.user.image.data)
  }
  next();
}



// Sign in Route 
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(200).json({
        Message: "USER email does not exists"
      });
    }

    //Checking the Authentication
    if (!user.authenticate(password)) {
      return res.status(200).json({
        Message: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    console.log({Message: "Successfully Signin", token, user: { _id, name, email, role } })
     res.json({Message: "Successfully Signin", token, user: { _id, name, email, role } });
  });
};

//SignOut Routes
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});




//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "You are not Authenticated ACCESS DENIED!!"
    });
  }
  next();
};

//Admin Middleware 
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};




