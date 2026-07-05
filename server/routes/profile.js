const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require("../controllers/profileController");

// ===============================
// Get Profile
// ===============================
router.get("/", authMiddleware, getProfile);

// ===============================
// Update Profile
// ===============================
router.put("/", authMiddleware, updateProfile);

// ===============================
// Change Password
// ===============================
router.put(
  "/password",
  authMiddleware,
  changePassword
);

// ===============================
// Upload Profile Image
// ===============================
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage
);

module.exports = router;