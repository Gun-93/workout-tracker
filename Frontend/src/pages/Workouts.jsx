import { useState } from "react";

// Predefined options
const purposes = ["Lose Weight", "Gain Muscle", "Stay Fit"];
const workoutTypes = ["Yoga", "Meditation", "Zumba", "Machine Exercise", "Cardio", "HIIT"];
const exercisesByPurpose = {
  "Lose Weight": ["Running", "Cycling", "Burpees", "Jumping Jacks", "Squats"],
  "Gain Muscle": ["Bench Press", "Deadlift", "Squats", "Pull-ups", "Overhead Press"],
  "Stay Fit": ["Push-ups", "Plank", "Lunges", "Pull-ups", "Squats"]
};

// Day-wise plan per purpose
const dayWisePlan = {
  "Lose Weight": {
    1: ["Running", "Burpees", "Jumping Jacks"],
    2: ["Cycling", "Squats", "Lunges"],
    3: ["HIIT", "Mountain Climbers", "Plank"],
    4: ["Jump Rope", "Burpees", "Squats"],
    5: ["Cycling", "Lunges", "Push-ups"],
    6: ["Running", "Plank", "Jumping Jacks"]
  },
  "Gain Muscle": {
    1: ["Bench Press", "Squats", "Pull-ups"],
    2: ["Deadlift", "Overhead Press", "Lunges"],
    3: ["Bench Press", "Squats", "Bicep Curls"],
    4: ["Deadlift", "Pull-ups", "Tricep Dips"],
    5: ["Overhead Press", "Squats", "Bench Press"],
    6: ["Deadlift", "Lunges", "Pull-ups"]
  },
  "Stay Fit": {
    1: ["Push-ups", "Plank", "Lunges"],
    2: ["Yoga", "Squats", "Meditation"],
    3: ["Push-ups", "Jumping Jacks", "Plank"],
    4: ["Zumba", "Lunges", "Push-ups"],
    5: ["Yoga", "Squats", "Plank"],
    6: ["Push-ups", "Meditation", "Lunges"]
  }
};

const loadOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const repsOptions = [5, 8, 10, 12, 15, 20];
const CALORIE_FACTOR = 0.1;

export default function Workouts() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    purpose: "",
    workoutType: ""
  });

  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [exerciseForm, setExerciseForm] = useState({ name: "", load: "", reps: "" });

  // Handle profile input change
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Submit profile
  const handleProfileSubmit = () => {
    const { name, age, gender, weight, height, purpose, workoutType } = profile;
    if (!name || !age || !gender || !weight || !height || !purpose || !workoutType) {
      alert("Please fill all fields!");
      return;
    }
    setProfileSubmitted(true);
  };

  // Handle exercise form changes
  const handleExerciseChange = (e) => {
    setExerciseForm({ ...exerciseForm, [e.target.name]: e.target.value });
  };

  // Add exercise with auto-calculated calories
  const handleAddExercise = () => {
    if (!exerciseForm.name || !exerciseForm.load || !exerciseForm.reps) return;

    const load = Number(exerciseForm.load);
    const reps = Number(exerciseForm.reps);
    const calories = Math.round(load * reps * CALORIE_FACTOR);

    const newExercise = {
      ...exerciseForm,
      load,
      reps,
      calories,
      date: new Date().toISOString().split("T")[0]
    };

    setExercises([newExercise, ...exercises]);
    setExerciseForm({ name: "", load: "", reps: "" });
  };

  // Last 6 days exercises
  const today = new Date();
  const last6Days = exercises.filter((ex) => {
    const exDate = new Date(ex.date);
    const diffDays = Math.floor((today - exDate) / (1000 * 60 * 60 * 24));
    return diffDays < 6;
  });
  const totalCalories = last6Days.reduce((sum, ex) => sum + ex.calories, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* --- User Profile Form (Side-by-Side Fields) --- */}
      {!profileSubmitted && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Enter Your Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Full Name" className="border p-2 rounded w-full" />
            <input type="number" name="age" value={profile.age} onChange={handleProfileChange} placeholder="Age" className="border p-2 rounded w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <select name="gender" value={profile.gender} onChange={handleProfileChange} className="border p-2 rounded w-full">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="workoutType" value={profile.workoutType} onChange={handleProfileChange} className="border p-2 rounded w-full">
              <option value="">Workout Type</option>
              {workoutTypes.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input type="number" name="weight" value={profile.weight} onChange={handleProfileChange} placeholder="Weight (kg)" className="border p-2 rounded w-full" />
            <input type="number" name="height" value={profile.height} onChange={handleProfileChange} placeholder="Height (cm)" className="border p-2 rounded w-full" />
          </div>

          <div className="mb-3">
            <select name="purpose" value={profile.purpose} onChange={handleProfileChange} className="border p-2 rounded w-full">
              <option value="">Select Your Goal</option>
              {purposes.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <button onClick={handleProfileSubmit} className="bg-green-600 text-white px-4 py-2 rounded mt-2">
            Submit Profile
          </button>
        </div>
      )}

      {/* --- Day-wise Plan --- */}
      {profileSubmitted && profile.purpose && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setProfileSubmitted(false)} className="bg-gray-400 text-white px-3 py-1 rounded">← Back</button>
            <h2 className="text-2xl font-semibold">{profile.name}'s 6-Day Plan</h2>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Day</th>
                  <th className="border px-2 py-1">Exercises</th>
                  <th className="border px-2 py-1">Reps</th>
                  <th className="border px-2 py-1">Load (kg)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((day) => {
                  const exercisesDay = dayWisePlan[profile.purpose][day];
                  return (
                    <tr key={day}>
                      <td className="border px-2 py-1 font-semibold">Day {day}</td>
                      <td className="border px-2 py-1">{exercisesDay.join(", ")}</td>
                      <td className="border px-2 py-1">{exercisesDay.map(() => profile.purpose === "Gain Muscle" ? 10 : 15).join(", ")}</td>
                      <td className="border px-2 py-1">{exercisesDay.map(() => profile.purpose === "Gain Muscle" ? 40 : 0).join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* --- Exercise Tracker --- */}
          <h2 className="text-xl font-semibold mb-2">Add Custom Exercise</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <select name="name" value={exerciseForm.name} onChange={handleExerciseChange} className="border p-2 rounded flex-1 min-w-[120px]">
              <option value="">Select Exercise</option>
              {profile.purpose && exercisesByPurpose[profile.purpose].map((ex) => <option key={ex} value={ex}>{ex}</option>)}
            </select>
            <select name="load" value={exerciseForm.load || ""} onChange={handleExerciseChange} className="border p-2 rounded w-[100px]">
              <option value="">Load (kg)</option>
              {loadOptions.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select name="reps" value={exerciseForm.reps || ""} onChange={handleExerciseChange} className="border p-2 rounded w-[100px]">
              <option value="">Reps</option>
              {repsOptions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button onClick={handleAddExercise} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
          </div>

          {/* Last 6 Days Summary */}
          <ul className="mb-2">
            {last6Days.map((ex, idx) => (
              <li key={idx}>
                {ex.date}: {ex.name} - Load: {ex.load}kg, Reps: {ex.reps}, Calories: {ex.calories} cal
              </li>
            ))}
          </ul>
          <p className="font-bold text-lg">Total Calories (last 6 days): {totalCalories} cal</p>
        </div>
      )}
    </div>
  );
}







