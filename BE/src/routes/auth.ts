import express from "express";
import { login, userDetails, register } from "../controllers/auth";
import isVerified from "../middleware/isVerified";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isVerified, userDetails);

export default router;