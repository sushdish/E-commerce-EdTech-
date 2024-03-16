
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

//Create Schema 
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true,
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true,
    },
    // photo: {
    //     data: Buffer,
    //     contentType: String,
    // },
    category: {
        type: ObjectId,
        ref: "category",
        required: true,
    },
    tag: [{
        type: ObjectId,
        ref: "tag",
        required: true,
    }],
    language: {
        type: String,
        trim: true,
        required: true,
    },
    // viewscount: {
    //     type: String,
    //     trim: true,
    // },
}, { timestamps: true })


// exporting Schema
module.exports = mongoose.model("Course", courseSchema)