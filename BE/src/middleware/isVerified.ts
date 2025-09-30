
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isVerified = (req: any, res: Response, next: NextFunction) => {
	const token = req.cookies?.token;
	if (!token) {
		return res.status(401).json({ message: "Authentication required" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = (typeof decoded === "object" && decoded) ? decoded : {};
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default isVerified;
