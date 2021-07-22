const express = require("express");
const router = express.Router();
const authControl = require("../controllers/authControl");
const {protect, admin} = require("../middleware/auth")
const {
 
  // registerUser,
  getUserProfile,
  updateUserProfile,
  // getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/authControl') ;


router.post("/register", authControl.register); // added API to prevent potential collide with front
router.post("/login", authControl.login);
router.post("/forgotpassword", authControl.forgotPassword);
router.put("/passwordreset/:resetToken", authControl.resetPassword);

// Admin routes to control user list
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

module.exports = router;