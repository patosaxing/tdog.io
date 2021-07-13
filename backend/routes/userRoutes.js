const express = require("express")
const router = express.Router()
const authControl = require("../controllers/authControl")



router.post("/api/register", authControl.register); // added API to prevent potential collide with front
router.post("/api/login", authControl.login);
router.post("/api/forgotpassword", authControl.forgotPassword);
router.put("/api/passwordreset/:resetToken", authControl.resetPassword);

module.exports = router;