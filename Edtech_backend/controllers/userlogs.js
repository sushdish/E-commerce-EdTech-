const moment = require("moment");
const Userlogs = require("../models/userlogs")


//Get userlog Id 
exports.getUserLogId = (req, res, id , next) => {

    Userlogs.findById(id).exec((err, userlog)=> {
        if(err) {
            return res.status(400).json({
                error: "Can't Find userlogs"
            })
        }
        req.userlog = userlog;
        next();
    })
}

//User Logs 
exports.createUserLogs =  (req, res)=> {
    
    const userlog = new Userlogs(req.body)
    userlog.save((err, userlog)=> {
        if(err || !userlog) {
            return res.status(400).json({
                error: "Not able to see logs"
            })
        }
        res.json(userlog)
    })

}

// Test this API  on Postman 
//Get User Login in a Specific Period
exports.UserLogins = async (req,res) => {

    try{
    // let to = moment(new Date("2022-01-20T00:00:00.998Z"))    This is the example 
    let from = moment(new Date(req.body.from));
    let to = moment(new Date(req.body.to));
         await Userlogs.find({
             createdAt:{
                 $gte:from,
                 $lt:to
             }
         }).then((resp) =>{
             res.status(200).json({
                 data:resp
             })
         })
        res.status(200).json({
            success: true
        })
    }
    catch(err){
        console.log(err)
    }

  
}