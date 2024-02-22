import express from "express";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import authFunctions from "../controllers/authController";
const router = express.Router();

router.post("/signUp", authFunctions.signUp);

router.post("/signIn", authFunctions.signIn);

export default router;
