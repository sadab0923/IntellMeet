const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require("../controllers/profileController");

// ===========================
// Get User Profile
// ===========================
router.get("/", authMiddleware, getProfile);

// ===========================
// Update Profile
// ===========================
router.put("/", authMiddleware, updateProfile);

// ===========================
// Change Password
// ===========================
router.put(
  "/password",
  authMiddleware,
  changePassword
);

// ===========================
// Upload Profile Image
// ===========================
router.post(
  "/upload",
  authMiddleware,
  uploadProfileImage
);

module.exports = router;