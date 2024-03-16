const mongoose = require('mongoose');



// Creating Schema 
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    },
}, { timestamps: true })

// exporting Schema
module.exports = mongoose.model("Tag", tagSchema)