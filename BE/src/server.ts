import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import auth from "./routes/auth";
import customer from "./routes/customer";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX_REQUEST) || 100, // limit each IP to 100 requrest
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// Database connection
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connection established.."))
  .catch((error) => console.error("Error while connecion - ", error));

// Routes
app.use("/auth", auth);
app.use("/customer", customer);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
