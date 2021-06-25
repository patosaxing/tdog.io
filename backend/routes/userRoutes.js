const express = require("express")
const router = express.Router()
//const User = require("../models/user")

router.post('/register', (req, res) =>
{
    res.send("I am hitting homepage")
})

module.exports = router