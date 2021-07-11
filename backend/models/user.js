// require("../config/db")
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            unique: true
        },

        password: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: 6,
            select: false,   // to prevent it got sent back with res.send
        },
        resetPasswordToken: String, // token to keep user stay logged in until logout
        resetPasswordExpire: Date,
        salt: { type: String, required: true, maxLength: 1000 },
        firstName: { type: String, required: false, trim: true, maxLength: 25 },
        lastName: { type: String, required: false, trim: true, maxLength: 25 },
    }
);

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };

module.exports = mongoose.model("Users", UserSchema)