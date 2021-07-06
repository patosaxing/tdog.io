//const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/user')

// import bcrypt from 'bcrypt'
// import jwt from ('jsonwebtoken')
// import Users from ('../models/user')

require("dotenv").config()

const authControl = {
    //Creating the register function
    register: async(req, res) => 
    {
        //Adding a console.log for testing
        //console.log("I am hitting register")
        try{
            const 
            {
                lastName, firstName, email, password, birthDate
            } = req.body

            //Function checks to see if the user registering has an existiing email
            const user_email = await Users.findOne({ email })
            if(user_email)
                return res.status(400).json({ msg: "This email already exists." })

            //checks to see if password entered are at least 6 characters
            if(password.length < 6)
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 letters or more" })
            
            //Hashes or protectes the password entered    
            //const passwordHash = await bcrypt.hash(password, 12)

            //Saves the new user
            const newUser = new Users(
                {
                    lastName, firstName, email, password, birthDate
                })

            await newUser.save()
            
            //If registration is successful, the message would show
            res.json(
                {
                    msg: "Registration Sucessful!",

                    user:{
                        ...newUser._doc,
                        password: password,
                    }
                }
            )
        }
        catch(err)
        {
            return res.status(500).json({msg: err.message })
        }
    },

    //Login Function
    login: async (req, res) =>{
        try {
            //Requires information entered in the email and password fields
            const { email, password } = req.body

            const user = await Users.findOne({ email })

            //Checks to see if user exists
            if(!user)
                return res.status(400).json({ msg: "This email does not exist." })

            //Checks to see if password is correct and exists
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." })

            //When login is successful, this message shows
            res.send(
                {
                    msg: "Login Sucessful",

                    user: {
                        id: user._id,
                        password: ""
                    }
                })
        }

        catch(err){
            return res.status(500).json({ msg: err.message})
        }
    }
}

module.exports = authControl