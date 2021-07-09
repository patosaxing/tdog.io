require("./db")
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email:{
            type: String,
            lowercase: true,
            required: [true, "can't be blank"]
        },

        password: { type: String, required: true, maxLength: 1000 },
        salt: { type: String, required: true, maxLength: 1000 },
        firstName: { type: String, required: true, trim: true, maxLength: 25},
        lastName: { type: String, required: true, trim: true, maxLength: 25},
        birthDate: { type: Date, required: false }
    }
)

module.exports = mongoose.model("Users", UserSchema)