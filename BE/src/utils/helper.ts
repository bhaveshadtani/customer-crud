import jwt from "jsonwebtoken";

const generateToken = (userId: string | unknown) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
export default generateToken