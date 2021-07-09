const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/user')

require("dotenv").config()

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
            const user_email = await Users.findOne({ email })
            console.log("Here one", user_email)
            if (user_email)
                return res.status(400).json({ msg: "This email already exists." })

            //checks to see if password entered are at least 6 characters
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 letters or more" })
            console.log("Herer  3")
            const newUser = new Users({ lastName, firstName, email, password })
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
                        // password: password, //should not return the password to frontend
                    }
                }
            )
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //Login Function
    login: async (req, res) => {
        try {
            //Requires information entered in the email and password fields
            const { email, password } = req.body

            const user = await Users.findOne({ email })

            //Checks to see if user exists
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." })

            //Checks to see if password is correct and exists
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." })

            //When login is successful, this message shows
            res.send(
                {
                    msg: `Login Sucessful with ${email}`,

                    user: {
                        id: user._id,
                        password: "Encrypted for security"
                    }
                })
        }

        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = authControl