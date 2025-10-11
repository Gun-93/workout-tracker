// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/workouts.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB(process.env.MONGO_URI);

// Middlewares
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allow your frontend origin
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/user", authRoutes);
app.use("/api/workouts", workoutRoutes);

// Basic health check
app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

// Serve React build in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // Serve static files from React app
  app.use(express.static(path.join(__dirname, "client/build"))); // update path if your React build is elsewhere

  // Handle React routing, return index.html for all non-API requests
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Error handler fallback
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


