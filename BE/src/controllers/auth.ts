
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/helper";

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password required" });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ email, password: hashedPassword });
		const token = generateToken(user._id);
        console.log(token);
		return res.status(201)
        .cookie("token", token, 
            { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production", 
                sameSite: "lax" 
            })
		.json({ message: "Register successfull.", user: { id: user._id, email: user.email } });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password required" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const token = generateToken(user._id);
        console.log(token);

		return res.status(200)
        .cookie("token", token, 
            { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production", 
                sameSite: "lax" 
            })
		.json({ message: "Login successfull.", user: { id: user._id, email: user.email } });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};

export const userDetails = async (req: any, res: Response) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ user });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};
