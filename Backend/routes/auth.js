// routes/auth.js
import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// POST /api/user/signup
router.post("/signup", signup);

// POST /api/user/login
router.post("/login", login);

export default router;
