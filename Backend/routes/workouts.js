// routes/workouts.js
import express from "express";
import {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.use(authMiddleware);

// GET /api/workouts
router.get("/", getWorkouts);

// POST /api/workouts
router.post("/", createWorkout);

// GET /api/workouts/:id
router.get("/:id", getWorkout);

// PATCH /api/workouts/:id
router.patch("/:id", updateWorkout);

// DELETE /api/workouts/:id
router.delete("/:id", deleteWorkout);

export default router;
