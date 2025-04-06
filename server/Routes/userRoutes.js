import { Router } from "express";
import { getUserProfile, updateUserProfile, userDetails } from "../Controllers/UserController.js";
import authenticateUser from "../middleware/Validation.js";

const router = Router();
console.log("✅ userRoutes.js loaded");

// Secured route with authentication middleware
router.get('/userProfile', authenticateUser, getUserProfile); // Requires authentication
router.put('/updateUserProfile', authenticateUser, updateUserProfile); // Requires authentication
router.post('/userDetails', authenticateUser, userDetails);

export default router;
