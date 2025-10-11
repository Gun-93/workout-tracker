// models/Workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    load: { type: Number, required: true },
    reps: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;

