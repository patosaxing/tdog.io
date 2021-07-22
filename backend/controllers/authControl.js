const crypto = require("crypto");
const User = require('../models/user')
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');

const authControl = {
    //Creating the register function
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
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }),
    //Login Function
    login: asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json("Invalid email or password");
            // res.status(401);
            // throw new Error('Invalid email or password');
        }

    }),

    // Forgor Password Initiation
    forgotPassword: async (req, res, next) => {
        // Send Email to email provided but first check if user exists
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json("No email could not be sent");
            }

            // Reset Token Gen and add to database hashed (private) version of token
            const resetToken = user.getResetPasswordToken();

            await user.save();

            // Create reset url to email to provided email
            const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

            // Message sent as an HTML body
            const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
          `;

            try {
                await sendEmail({
                    to: user.email,
                    subject: "Password Reset Request",
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
                data: "Password Updated Success",
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
            });
        } else {
            return res.status(401).json("User not found");

        }
    },

    // @desc    Update user profile
    // @route   PUT /api/users/profile
    updateUserProfile: async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
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