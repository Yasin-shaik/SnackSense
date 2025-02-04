import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Api.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
//import "../Assets/CSS/Details.css";

const Details = (props) => {
  const navigate=useNavigate();
  const [userData, setUserData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    dietType: [],
    allergies: [],
    activityLevel: "",
    waterIntake: "",
    sleepHours: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value),
    }));
  };

  const handleDetails = async () => {
    const email=props.user;
    if(!email)
        return console.log('Email not here');
    await axios.post("/user/userDetails", { userData, email });
    toast.success("You are now ready to scan");
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" theme="light" />
      <h2 className="mb-4 text-center">User Profile</h2>
      <div>
        {/* Basic Health Profile */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={userData.age}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            name="weight"
            value={userData.weight}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Height (cm)</label>
          <input
            type="number"
            className="form-control"
            name="height"
            value={userData.height}
            onChange={handleChange}
          />
        </div>

        {/* Dietary Preferences & Restrictions */}
        <div className="mb-3">
          <label className="form-label">Diet Type</label>
          {[
            "Vegetarian",
            "Vegan",
            "Keto",
            "Low-Carb",
            "High-Protein",
            "Mediterranean",
            "Paleo",
            "Gluten-Free",
            "Dairy-Free",
          ].map((diet) => (
            <div key={diet} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="dietType"
                value={diet}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">{diet}</label>
            </div>
          ))}
        </div>

        {/* Allergies */}
        <div className="mb-3">
          <label className="form-label">Allergies</label>
          {[
            "Gluten",
            "Lactose/Dairy",
            "Nuts (Peanuts, Almonds, etc.)",
            "Soy",
            "Eggs",
            "Seafood (Fish/Shellfish)",
            "Artificial Preservatives & Additives",
          ].map((allergy) => (
            <div key={allergy} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="allergies"
                value={allergy}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">{allergy}</label>
            </div>
          ))}
        </div>

        {/* Fitness & Lifestyle */}
        <div className="mb-3">
          <label className="form-label">Activity Level</label>
          <select
            className="form-control"
            name="activityLevel"
            value={userData.activityLevel}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Light Activity">Light Activity</option>
            <option value="Moderate">Moderate</option>
            <option value="Active">Active</option>
            <option value="Very Active">Very Active</option>
          </select>
        </div>

        {/* Optional Tracking */}
        <div className="mb-3">
          <label className="form-label">Daily Water Intake (ml)</label>
          <input
            type="number"
            className="form-control"
            name="waterIntake"
            value={userData.waterIntake}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Daily Sleep Hours</label>
          <input
            type="number"
            className="form-control"
            name="sleepHours"
            value={userData.sleepHours}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          onClick={handleDetails}
          className="btn btn-success"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Details;
