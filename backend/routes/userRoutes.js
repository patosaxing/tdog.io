const express = require("express")
const router = express.Router()
const authControl = require("../controllers/authControl")
//const User = require("../models/user")


router.post("/register", authControl.register);

router.post("/login", authControl.login)

// router.post('/register', (req, res) =>
// {
//     res.send("I am hitting homepage")
// })

module.exports = router