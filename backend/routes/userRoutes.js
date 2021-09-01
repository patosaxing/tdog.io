const express = require("express");
const router = express.Router();
const authControl = require("../controllers/authControl");
const {protect, admin} = require("../middleware/auth")


router.post("/register", authControl.register); // added API to prevent potential collide with front
router.post("/login", authControl.login);
router.post("/forgotpassword", authControl.forgotPassword);
router.put("/passwordreset/:resetToken", authControl.resetPassword);

// profile route to add skills, resume...
router
.route('/profile')
.get(protect, authControl.getUserProfile)
.put(protect, authControl.updateUserProfile);

// Admin routes to control user list
router
    .route('/:id')
    .delete(protect, admin, authControl.deleteUser)
    .get(protect, admin, authControl.getUserById)
    .put(protect, admin, authControl.updateUser);

module.exports = router;