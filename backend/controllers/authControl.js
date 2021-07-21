const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require('../models/user')
const sendEmail = require("../utils/sendEmail");


const authControl = {
    //Creating the register function
    register: async (req, res, next) => {
        const { username, email, password } = req.body;

        // check if user is already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return next(new ErrorResponse("User already exists, please log in", 400));
        }

        try {
            const user = await User.create({
                username,
                email,
                password,
            });

            sendToken(user, 200, res);
        } catch (err) {
            next(err);
        }
    },

    //Login Function
    login: async (req, res, next) => {
        const { email, password } = req.body;
        // to reduce server load: Check if email and password is provided
        if (!email || !password) {
            return next(new ErrorResponse("Please provide an email and password", 400));
        }
        try {
            // Check that user exists by email
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return next(new ErrorResponse("Invalid credentials", 401));
            }

            // Check that password match
            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return next(new ErrorResponse("Invalid credentials", 401));
            }

            // loggin sucess
            sendToken(user, 200, res);
        } catch (err) {
            next(err); // use middleware to handle error
        }
    },

    // Forgor Password Initiation
    forgotPassword: async (req, res, next) => {
        // Send Email to email provided but first check if user exists
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return next(new ErrorResponse("No email could not be sent", 404));
            }

            // Reset Token Gen and add to database hashed (private) version of token
            const resetToken = user.getResetPasswordToken();

            await user.save();

            // Create reset url to email to provided email
            const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

            // HTML Message
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

                return next(new ErrorResponse("Email could not be sent", 500));
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
                return next(new ErrorResponse("Invalid Token", 400));
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
            return next(new ErrorResponse("User not found", 401));
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
            return next(new ErrorResponse("User not found", 401));
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
            return next(new ErrorResponse("User not found", 404));
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
            return next(new ErrorResponse("User not found", 404));
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
            return next(new ErrorResponse("User not found", 404));
        }
    }
}
// Send Token with status coode
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};

module.exports = authControl