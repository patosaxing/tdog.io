const express = require("express")
const router = express.Router()
const authControl = require("../controllers/authControl")
//const User = require("../models/user")


router.post("/api/register", authControl.register); // added API to prevent potential collide with front

router.post("/api/login", authControl.login)

module.exports = router