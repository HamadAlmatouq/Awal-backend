const express = require("express");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const User = require("../../models/User");
const PasswordManager = require("../../helpers/PasswordManager");
const validateRequest = require("../../middleware/validateRequest");
const { BadRequestError } = require("../../errors");

const router = express.Router();

const validators = [
  body("username").not().isEmpty().withMessage("Username is required"),
  body("password").trim().not().isEmpty().withMessage("Password is required"),
];

router.post("/signin", validators, validateRequest, async (req, res, next) => {
  // Find a user
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return next(new BadRequestError("Invalid credentials"));

  // Compare password
  const passwordsMatch = await PasswordManager.compare(user.password, password);

  if (!passwordsMatch) return next(new BadRequestError("Invalid credentials"));

  // Generate a token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role }, // Include role in the token
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  // Respond with the token
  res.status(200).json({ token });
});

module.exports = { signinRouter: router };