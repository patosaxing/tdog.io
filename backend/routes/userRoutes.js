const express = require("express")
const router = express.Router()
const authControl = require("../controllers/authControl")



router.post("/register", authControl.register); // added API to prevent potential collide with front
router.post("/login", authControl.login);
router.post("/forgotpassword", authControl.forgotPassword);
router.put("/passwordreset/:resetToken", authControl.resetPassword);

module.exports = router;