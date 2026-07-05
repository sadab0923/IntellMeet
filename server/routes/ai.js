const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.json({
  success: true,
  token,
});