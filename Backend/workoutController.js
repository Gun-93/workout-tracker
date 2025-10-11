// controllers/workoutController.js
import Workout from "../models/Workout.js";

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching workouts" });
  }
};

export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user.id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching workout" });
  }
};

export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    if (!title || load === undefined || reps === undefined) return res.status(400).json({ message: "Missing fields" });
    const workout = await Workout.create({ title, load, reps, user: req.user.id });
    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating workout" });
  }
};

export const updateWorkout = async (req, res) => {
  const updates = req.body;
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating workout" });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting workout" });
  }
};
