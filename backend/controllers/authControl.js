const crypto = require("crypto");
const User = require('../models/user')
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');
const mongoose = require('mongoose');

const authControl = {
    //Register new user
    register: asyncHandler(async (req, res, next) => {
        const { username, email, password } = req.body;

        // check if user is already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json("User already exists, ...please log in");
        }
        const user = await User.create({
            username,
            email,
            password,
            primarySkills: [],
            userLocation: '',
            linkedIN: '',
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                primarySkills: user.primarySkills,
                userLocation: user.userLocation,
                linkedIN: user.linkedIN,
            });
        } else {
            // Good practice: FOr backend security, just send back a generic error to FE
            return res.status(400).json("Invalid user data. All fields are reuired.");

        }
    }),
    //Login Function
    login: async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                primarySkills: user.primarySkills,
                userLocation: user.userLocation,
                linkedIN: user.linkedIN,
            });
        } else {
            return res.status(401).json("Invalid email or password");
        }

    },


    // Forgor Password Initiation
    forgotPassword: async (req, res, next) => {
        // Send Email to email provided but first check if user exists
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json("This email can't be sent");
            }

            // Reset Token Gen and add to database hashed (private) version of token
            const resetToken = user.getResetPasswordToken();

            await user.save();

            // Create reset url to email to provided email-address
            const resetUrl = `https://evalview.herokuapp.com/passwordreset/${resetToken}`;

            // Message sent as an HTML body
            const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
          `;

            try {
                await sendEmail({
                    to: user.email,
                    subject: "Evalview Password Reset Request",
                    text: message,
                });

                res.status(200).json({ success: true, data: `Email Sent to ${email}` });
            } catch (err) {
                console.log(err);

                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save();
                return res.status(500).json("Email could not be sent");
            }
        } catch (err) {
            next(err);
        }
    },

    // Reset user Password
    resetPassword: async (req, res, next) => {
        // Compare token in URL params to hashed token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");

        try {
            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).json("invalid Token");

            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            res.status(201).json({
                success: true,
                data: "Password Reset Success",
                token: user.getSignedJwtToken(),
            });
        } catch (err) {
            next(err);
        }
    },

    // @desc    Get user profile
    // @route   GET /api/users/profile
    getUserProfile: async (req, res, next) => {
        const user = await User.findById(req.user._id);
        
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                primarySkills: user.primarySkills,
                userLocation: user.userLocation,
                linkedIN: user.linkedIN,
            });
        } else {
            return res.status(401).json("User not found");
        }
    },


    // @desc    Update user profile
    // @route   PUT /api/users/profile
    updateUserProfile: async (req, res) => {
        const id = req.user._id;
        const user = await User.findById(req.user._id);
        // const {password, primarySkill, userLocation, linkedIN } = req.body;

        // if (!user) {
        //     return res.status(404).send(`No user found`);
        // } else {
        //     if (req.body.password) {
        //         password = req.body.password;
        //     }
        // }
        // const updatedProfile = { password, primarySkill, userLocation, linkedIN }
        // await User.findByIdAndUpdate(id, updatedProfile, { new: true });
        // res.json({
        //     // _id: updatedProfile._id,
        //     isAdmin: updatedProfile.isAdmin,
        //     primarySkill: updatedProfile.primarySkill,
        //     userLocation: updatedProfile.userLocation,
        //     linkedIN: updatedProfile.linked,
        //     token: generateToken(updatedProfile._id),
        // });
        // },
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.primarySkills = req.body.primarySkills || user.primarySkills;
            user.userLocation = req.body.userLocation || user.userLocation;
            user.linkedIN = req.body.linkedIN || user.linkedIN;

            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.primarySkills) {
                user.primarySkills = req.body.primarySkills;
            }
            if (req.body.linkedIN) {
                user.linkedIN = req.body.linkedIN;
            }
            if (req.body.userLocation) {
                user.userLocation = req.body.userLocation;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
                primarySkills: updatedUser.primarySkills,
                userLocation: updatedUser.userLocation,
                linkedIN: updatedUser.linkedIN,
            });
        } else {
            return res.status(401).json("User not found");
        }
    },

    // @desc    Get all users
    // @route   GET /api/users
    getUsers: async (req, res) => {
        const users = await User.find({});
        res.json(users);
    },

    // @desc    Delete user
    // @route   DELETE /api/users/:id
    // @access  Private/Admin
    deleteUser: async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            return res.status(400).json("User not found");

        }
    },

    // @desc    Get user by ID
    // @route   GET /api/users/:id
    // @access  Private/Admin
    getUserById: async (req, res) => {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            res.json(user);
        } else {
            return res.status(404).json("User not found");

        }
    },

    // @desc    Update user
    // @route   PUT /api/users/:id
    // @access  Private/Admin
    updateUser: async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            return res.status(404).json("User not found");

        }
    }
}
// Send Token with status coode
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};

module.exports = authControl