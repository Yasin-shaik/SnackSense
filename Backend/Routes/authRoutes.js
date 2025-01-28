import {Router} from "express";
import { validateLoginInput, validateRegisterInput } from "../Middleware/validation.js";
import { login, register } from "../Controllers/AuthController.js";

const router = Router();
router.post('/register',validateRegisterInput,register);
router.post('/login',validateLoginInput,login);


export default router;