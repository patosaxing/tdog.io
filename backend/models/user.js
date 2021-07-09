// require("../config/db")
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
            ],
        },

        password: { 
            type: String, 
            required: [true, "Please provide a password" ],
            minLength: 6,
            maxLength: 100, },
        salt: { type: String, required: true, maxLength: 1000 },
        firstName: { type: String, required: true, trim: true, maxLength: 25 },
        lastName: { type: String, required: true, trim: true, maxLength: 25 },
        birthDate: { type: Date, required: false }
    }
)

module.exports = mongoose.model("Users", UserSchema)