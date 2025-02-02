const Profile = require('../models/profileModel');

const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, age, allergies, preferences, healthConditions } = req.body;

  console.log('Received profile data:', {
    userId,
    name,
    age,
    allergies,
    preferences,
    healthConditions,
  });

  try {
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId });
    }

    // Convert data types if necessary
    profile.name = name;
    profile.age = Number(age); // Ensure age is a number
    profile.allergies = Array.isArray(allergies) ? allergies : [allergies];
    profile.preferences = Array.isArray(preferences)
      ? preferences
      : [preferences];
    profile.healthConditions = Array.isArray(healthConditions)
      ? healthConditions
      : [healthConditions];

    await profile.save();
    console.log('Profile saved successfully:', profile);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(400).json({ error: 'Failed to update profile' });
  }
};

module.exports = { updateProfile };
