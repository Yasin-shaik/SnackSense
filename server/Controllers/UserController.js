import UserDetails from "../models/UserDetails.js";
import { validationResult } from "express-validator"; // For input validation

// User details creation endpoint
export const userDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userData, email } = req.body;
    const { age, gender, weight, height, dietType, allergies, activityLevel, waterIntake, sleepHours } = userData;

    // Ensure all necessary fields are present in the userData
    if (!age || !gender || !weight || !height || !dietType || !activityLevel || !waterIntake || !sleepHours) {
      return res.status(400).json({ message: "Missing required fields in user data" });
    }

    // Create new user details document
    const user = new UserDetails({
      email,
      age,
      gender,
      weight,
      height,
      dietType,
      allergies,
      activityLevel,
      waterIntake,
      sleepHours,
    });

    // Save user details
    await user.save();

    // Send success response
    return res.status(201).json({ message: "User details saved successfully", user });

  } catch (error) {
    console.error("User details error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get user profile
// Function to get user profile
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ msg: 'Unauthorized, no user found' });
    }

    const user = await UserDetails.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user); // Send user data back to frontend
  } catch (err) {
    console.error('Error getting user profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};




// Function to update user profile
export const updateUserProfile = async (req, res) => {
  try {
      const { age, gender, weight, height, dietType, allergies, activityLevel, waterIntake, sleepHours } = req.body;

      const updatedUser = await UserDetails.findOneAndUpdate(
          { email: req.user.email },  // Use req.user.email to find the logged-in user
          { age, gender, weight, height, dietType, allergies, activityLevel, waterIntake, sleepHours },
          { new: true }  // Returns the updated document
      );

      if (!updatedUser) {
          return res.status(404).json({ msg: 'User not found' });
      }

      res.json(updatedUser);  // Send the updated user data as response
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ msg: 'Server error' });
  }
};
