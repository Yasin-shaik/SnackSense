import { Router } from "express";
import { registerUser, registerNutri, loginUser, loginNutri } from "../Controllers/AuthController.js";
import { check, validationResult } from "express-validator";
import validateInput from "../middleware/ValidationMiddleware.js";
import User from "../models/User.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = Router();

// Register User route with input validation and validateInput middleware
router.post('/registerUser', 
  [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('name').notEmpty().withMessage('Name is required')
  ], 
  validateInput,  // Validate the input after checking for errors
  registerUser);

// Register Nutritionist route with input validation and validateInput middleware
router.post('/registerNutri', 
  [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('name').notEmpty().withMessage('Name is required')
  ], 
  validateInput,  // Validate the input after checking for errors
  registerNutri);

// Login User route with input validation and JWT handling, including secure cookies
router.post('/loginUser', async (req, res) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const isProduction = process.env.NODE_ENV === 'production';

  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist, please register' });

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_SECRET,
    );
    

    // Set cookie securely depending on the environment (only in production)
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: isProduction, // Only set secure cookies in production
    });

    res.status(200).json({ msg: 'User logged in', token, 
      user: {
      id: user._id,
      email: user.email,
      name: user.name,
      // Add any other fields if needed
    }});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Login Nutritionist route with input validation and JWT handling, including secure cookies
router.post('/loginNutri', async (req, res) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const isProduction = process.env.NODE_ENV === 'production';

  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nutritionist = await Nutritionist.findOne({ email });
    if (!nutritionist) return res.status(400).json({ msg: 'user does not exist, please register' });

    const isValidUser = await bcrypt.compare(password, nutritionist.password);
    if (!isValidUser) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { user: { id: nutritionist._id, email: user.email } },
      process.env.JWT_SECRET,
    );

    // Set cookie securely depending on the environment (only in production)
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: isProduction, // Only set secure cookies in production
    });

    res.status(200).json({ msg: 'Nutritionist logged in', token,
  user: {
    id: nutritionist._id,
    email: nutritionist.email,
    name: nutritionist.name,
  } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Reset password route
router.post('/resetPassword', [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validateInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


export default router;
