const mongoose = require('mongoose')
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')


// Creating Schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    encry_password: {
        type: String,
        required: true,
    },
    // image: {
    //     data: Buffer,
    //     contentType: String,
    // },
    // country: {
    //     type: String,
    //     trim: true,
    //     required: true,
    // },
    // city: {
    //     type: String,
    //     trim: true,
    //     required: true,
    // },
    // language: {
    //     type: String,
    //     trim: true,
    //     required: true,
    // },
    // education: {
    //     type: String,
    //     trim: true,
    //     required: true,
    // },
    //to get Hex Values in Password 
    salt: String,
   // If want to signup as admin then pass the role as "1" else by default it will "0" for user
    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });


userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password
    })


userSchema.methods = {

    // Need a Method to call where we cam match the Hash  Values.
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";                    // if there is no password return blank 
        try {
            return crypto.createHmac('sha256', this.salt)                //update the salt 
                .update(plainpassword)                 // Update the plain password 
                .digest('hex');
        } catch (error) {
            return "";
        }

    }
}

// exporting Schema 
module.exports = mongoose.model("User", userSchema)



