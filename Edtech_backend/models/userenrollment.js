const mongoose = require('mongoose');


// Creating Schema 
const userenrollmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId : {
        type: String,
        required: true,
    },
}, { timestamps: true })


// Exporting Schema 
module.exports = mongoose.model("UserEnrollment", userenrollmentSchema)