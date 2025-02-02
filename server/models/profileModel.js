const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String },
  age: { type: Number },
  allergies: { type: [String], default: [] },
  preferences: { type: [String], default: [] },
  healthConditions: { type: [String], default: [] },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
