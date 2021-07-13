const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require('../models/user')
const sendEmail = require("../utils/sendEmail");


const authControl = {
    //Creating the register function
    register: async (req, res) => {
        //Adding a console.log for testing
        //console.log("I am hitting register")
        try {
            const
                {
                    lastName, firstName, email, password
                } = req.body

            //Function checks to see if the user registering has an existiing email
            console.log("I am hitting page")
            const user_email = await User.findOne({ email })
            console.log("Here one", user_email)
            if (user_email)
                return res.status(400).json({ msg: "This email already exists." })

            //checks to see if password entered are at least 6 characters
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 letters or more" })
            console.log("Herer  3")
            const newUser = new User({ lastName, firstName, email, password })
            console.log("!!!")
            const salt = await bcrypt.genSalt(10)
            newUser.salt = salt
            console.log("!!!!", salt)
            newUser.password = await bcrypt.hash(newUser.password, salt)
            console.log("here too")

            await newUser.save()
            console.log("!!!!!")
            //If registration is successful, the message would show
            res.json(
                {
                    msg: "Registration Sucessful!",

                    user: {
                        ...newUser._doc,
                    }
                }
            )
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
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

                res.status(200).json({ success: true, data: "Email Sent" });
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
    }
}
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };

module.exports = authControl