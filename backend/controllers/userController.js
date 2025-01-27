const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password || !passwordConfirm) {
    res.status(400);
    throw new Error("All fields must be added");
  }

  //   validation checks
  if (password.length < 8) {
    return res.status(400).send("Password must be at least 8 characters");
  }

  if (password.length > 64) {
    return res.status(400).send("Password must be 64 characters or less");
  }

  if (password !== passwordConfirm) {
    return res.status(400).send("Passwords are not the same!");
  }

  //   // Check if user exists
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).send("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    email,
    username,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).send("Invalid user data");
  }
});



// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check for user name
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);

    res.json({
      _id: user.id,
      email: user.email,
      username: user.username,
      token,
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
});


module.exports = {
  registerUser,
  loginUser
}