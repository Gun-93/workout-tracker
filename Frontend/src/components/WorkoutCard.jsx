export default function WorkoutCard({ workout }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{workout.title}</h3>
        <p>Load: {workout.load} kg | Reps: {workout.reps}</p>
      </div>
    </div>
  );
}
