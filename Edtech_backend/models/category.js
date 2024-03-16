const mongoose = require('mongoose');



//Create Schema 
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    }
    // image: {
    //     data: Buffer,
    //     contentType: String,
    // }
}, { timestamps: true })

//Exporting Schema
module.exports = mongoose.model("Category", categorySchema)