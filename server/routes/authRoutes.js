const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
    changePassword,
    updateProfile,
    logoutUser
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", getMe);

router.put("/change-password", changePassword);

router.put("/profile", updateProfile);

router.post("/logout", logoutUser);

module.exports = router;