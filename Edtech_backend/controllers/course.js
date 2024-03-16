const Course = require("../models/course")
const formidable = require("formidable");    //  formidabale & lodash libraries to load images
const _ = require("lodash");
const fs = require("fs")
const {validationResult } = require("express-validator");
const { filter } = require("lodash");
const category = require("../models/category");
const tag = require("../models/tag")


//Get Course ID 
exports.getCourseById = (req, res, next , id) => {
    Course.findById(id)
    // wanna to fetch the course & Tag based on category 
    .populate("category")
    .populate("tag")
    .exec((err , course)=> {
        if(err){
            return res.status(400).json({
                error: "Cannot Find Course"
            })
        }
        req.course = course;
        next();
    })
}

///Creating Courses
exports.createCourse = (req, res) => {


    let form = new formidable.IncomingForm();
    form.keepExtensions = true;                 // extensions means jpeg, png

    form.parse(req, (err , fields , file)=> {
        if (err) {
           return res.status(400).json({
               error: "Failed to Upload Image"
           }); 
        }

        // Handling fields 
        const { title, subtitle, language, category, viewscount } = fields

        if (
            !title ||
            !subtitle ||
            !category ||
            !language ||
            !viewscount

        ) {
            return res.status(400).json({
                error: "PLease include All fields"
            })
        }

        
        let course = new Course(fields);

        // HAndle File here
        // checking File Size 
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size is too Big"
                });
            }
            // After Saving photo database.
            course.photo.data = fs.readFileSync(file.photo.path);
            course.photo.contentType =file.photo.type;

        }
        // console.log(product)

        // Save to DB 
        course.save((err , course)=> {
            if (err) {
                return res.status(400).json({
                    error: "Unable to to save to Database."
                })
            }
            res.json({
                message: "Course Created Successfully",
                data: course})
        })
    })

}


// Get all Courses 

exports.getAllCourses = (req, res) => {
    Course.find().exec((err, courses)=> {
        if(err) {
            return res.status(400).json({
                error: "NO category has been found"
            })
        }
        res.json(courses)
    })
  }
 
//Middleware 
exports.photo = (req, res , next) => {
    if (req.course.photo.data) {
        res.set("Content-Type", req.course.photo.contentType);
        return res.send(req.course.photo.data)
    }
    next();
}




