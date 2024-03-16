const Tag = require("../models/tag");
const Course = require("../models/course")


// Get Tag ID 
exports.getTagById = (req, res , next , id) => {
    Tag.findById(id).exec((err, tag)=> {
        if(err) {
            return res.status(400).json({
                error: "Can't Find Tag"
            })
        }
        req.tag = tag;
        next();
    })
}


// Creating Tag 
exports.createTag = (req, res)=> {

    const tag = new Tag(req.body)
    tag.save((err, tag)=> {
        if(err || !tag) {
          console.log(err, "AD")
            return res.status(400).json({
                error: "Not able to add the Tag"
            })
        }
        res.json({
          message: "Tag Created Successfully",
          data: tag,
        })
    })

}


exports.getAllTags = (req, res) => {
  Tag.find().exec((err, tags)=> {
      if(err) {
          return res.status(400).json({
              error: "NO category has been found"
          })
      }
      res.json(tags)
  })
}

// Test this API  on Postman 

// Get list of Courses with Tag Name 
exports.listOfCoursesTagName = async (req, res) => {
    const courses = await Course.aggregate([
        {
          '$unwind': {
            'path': '$tag'
          }
        }, {
          '$lookup': {
            'from': 'tags', 
            'localField': 'tag', 
            'foreignField': '_id', 
            'as': 'Tag'
          }
        }, {
          ///User has to send the Tag Name 
          '$match': {
            'Tag.name': req.body.tag
          }
        }
      ])

    // console.log(courses)

    return res.json(courses)
}







