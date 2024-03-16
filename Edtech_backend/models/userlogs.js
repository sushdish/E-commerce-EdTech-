const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



// Creating Schema 
const userlogsSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "user",
        required: true,
    },
    ip: {
        type: String,
        unique: true
    },
    loggedin: {
        type: String,
    },
}, {timestamps: true})



// exporting Schema 
module.exports = mongoose.model("Userlogs", userlogsSchema)