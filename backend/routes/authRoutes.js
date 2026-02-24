import express from 'express';
import { Login, SignUp } from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleWare.js'
import rateLimit from "express-rate-limit";

const authRoutes=express.Router();

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 minutes
  max: 3,
  message: "Too many login attempts"
});

authRoutes.post('/signup',SignUp);
authRoutes.post('/login',loginLimiter,Login);
authRoutes.get("/me", authMiddleWare, (req, res) => {
  console.log("Inside /me route");
  res.status(200).json({ success: true, user: req.user });
});
export default authRoutes;