const Category = require("../models/category");
const Course = require("../models/course")
const formidable = require("formidable"); 
const _ = require("lodash");
const fs = require("fs");
const { Console } = require("console");
const { result } = require("lodash");


/// get Category ID 
exports.getCategoryById = (req, res , next , id) => {
    Category.findById(id).exec((err, cate)=> {
        if(err) {
            return res.status(400).json({
                error: "Can't Find Category"
            })
        }
        req.category = cate;
        next();
    })
}


// create Category 
exports.createCategory = (req, res)=> {


    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true; 

    // form.parse(req, (err, fields, file) => {
    //     if(err){
    //         return res.status(400).json({
    //             error: "Problem with image"
    //         })
    //     }
    
    //     const {name } = fields

    //     if (!name) {
    //         return res.status(400).json({
    //             error: "PLease include name field"
    //         })
    //     }

    // let category = new Category(fields);

    // //Handle File
    // if(file.image){
    //     if(file.image.size > 3000000){
    //         return res.status(400).json({
    //             error: "File Size is too Big!"
    //         })
    //     }
    //     category.image.data = fs.readFileSync(file.image.path);
    //     category.image.contentType =file.image.type;

    // }

    //Save to DB 
    console.log(req.body)
    const category = new Category(req.body)
    category.save((err, category)=> {
        if(err || !category) {
          console.log(err, "Error")
            return res.status(400).json({
                error: "Not able to add the category"
            })
        }
        res.json({
            message: "Category Created Successfully",
            data: category,
        })
    })

// })
}

//get All Categories to display for frontend
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories)=> {
      if(err) {
          return res.status(400).json({
              error: "NO category has been found"
          })
      }
      res.json(categories)
  })
}


// Middleware 
//It is used to handle the photo in th background
exports.image = (req, res , next) => {
    if (req.category.photo.data) {
        res.set("Content-Type", req.category.image.contentType);
        return res.send(req.category.image.data)
    }
    next();
}

/// Most Enrolled User with Tag name 
exports.mostEnrolledCategories = async  (req, res) => {
    const courses = await Course.aggregate([
        {
          '$group': {
            '_id': '$category', 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'count': -1
          }
        }, {
          '$limit': 1
        }, {
          '$lookup': {
            'from': 'categories', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'category'
          }
        }, {
          '$project': {
            'name': {
              '$first': '$category.name'
            }
          }
        }
      ])

      return res.json(courses)
}




