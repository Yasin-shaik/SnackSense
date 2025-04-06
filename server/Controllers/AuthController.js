import User from "../models/User.js";
import Nutritionist from "../models/Nutritionist.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";  // Added for input validation

// Helper function for register logic
const registerEntity = async (entityModel, req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let entity = await entityModel.findOne({ email });
        if (entity) {
            return res.status(400).json({ msg: `${entityModel.modelName} already exists` });
        }

        entity = new entityModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        entity.password = await bcrypt.hash(password, salt);
        await entity.save();
        

        const payload = { [entityModel.modelName.toLowerCase()]: { id: entity.id } };

        // Sign the JWT token
        try {
            const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
            res.status(201).json({
                msg: `${entityModel.modelName} registered successfully`,
                token,
                user: {
                  id: entity._id,
                  email: entity.email,
                  name: entity.name,
                }
              });
              
        } catch (err) {
            console.error("JWT Sign Error:", err);
            res.status(500).send("Server Error");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


// Register user
export const registerUser = (req, res) => registerEntity(User, req, res);

// Register nutritionist
export const registerNutri = (req, res) => registerEntity(Nutritionist, req, res);

// Helper function for login logic
const loginEntity = async (entityModel, req, res) => {
    const { email, password } = req.body;

    // Check for input validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const entity = await entityModel.findOne({ email });
        if (!entity) return res.status(400).json({ msg: 'Invalid credentials' });

        const isValidUser = await bcrypt.compare(password, entity.password);
        if (!isValidUser) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign(
            { user: { id: entity._id, email: entity.email } },
            process.env.JWT_SECRET
          );
          
        const oneDay = 1000 * 60 * 60 * 24;

        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + oneDay), secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ msg: `${entityModel.modelName} logged in`, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Login user
export const loginUser = (req, res) => loginEntity(User, req, res);

// Login nutritionist
export const loginNutri = (req, res) => loginEntity(Nutritionist, req, res);
