import { useState } from "react";
import API from "../services/api";

export default function WorkoutForm({ onWorkoutAdded }) {
  const [form, setForm] = useState({ title: "", load: "", reps: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/workouts", {
        title: form.title,
        load: Number(form.load),
        reps: Number(form.reps),
      });

      // Reset form
      setForm({ title: "", load: "", reps: "" });

      // Notify parent to update list
      onWorkoutAdded(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to add workout. Make sure you are logged in."
      );
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</div>}
      <input
        type="text"
        name="title"
        placeholder="Workout Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <input
        type="number"
        name="load"
        placeholder="Load (kg)"
        value={form.load}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={form.reps}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add Workout
      </button>
    </form>
  );
}

