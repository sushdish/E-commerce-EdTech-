const UserEnrollment = require("../models/userenrollment")

//Get User enrollemnt id
exports.getUserEnrollemntId = (req, res, id , next) => {

    UserEnrollment.findById(id).exec((err, userenroll)=> {
        if(err) {
            return res.status(400).json({
                error: "Can't Find userlogs"
            })
        }
        req.userenroll = userenroll;
        next();
    })
}

// saving User Enrollment data 
exports.UserEnrollment = (req, res)=> {
    const enrolluser = new UserEnrollment(req.body)
    enrolluser.save((err, userenroll)=> {
        if(err || !userenroll) {
            return res.status(400).json({
                error: "Not able to Enroll"
            })
        }
        res.json({
            message: "User Enrolled Successfully",
            data: userenroll,
         })
    })
   
   }