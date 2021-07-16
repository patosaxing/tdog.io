const express = require("express")
const router = express.Router()
const authControl = require("../controllers/authControl")



router.post("/api/users/register", authControl.register); // added API to prevent potential collide with front
router.post("/api/users/login", authControl.login);
router.post("/api/users/forgotpassword", authControl.forgotPassword);
router.put("/api/users/passwordreset/:resetToken", authControl.resetPassword);

module.exports = router;