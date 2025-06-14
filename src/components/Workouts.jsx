import React from "react";
import { useState } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";

function Workouts() {
  const [workoutPlan, setWorkoutPlan] = useState([
    {
      id: 1,
      name: "Morning Run",
      type: "cardio",
      duration: 30,
      completed: false,
    },
    {
      id: 2,
      name: "Push-ups",
      type: "strength",
      sets: 3,
      reps: 12,
      completed: false,
    },
    { id: 3, name: "Plank", type: "core", duration: 60, completed: false },
  ]);
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || exercise.bodyPart === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="workout-section p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      {/* Today's Workout Plan */}
      <div className="todays-workout mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl">
            Today's Workout Plan
          </h2>
          <button className="edit-button flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all">
            <FiEdit /> Edit
          </button>
        </div>

        <ul className="workout-list space-y-4">
          {workoutPlan.map((workout) => (
            <li
              key={workout.id}
              className={`flex justify-between items-center p-4 rounded-xl border ${
                workout.completed
                  ? "border-green-400 bg-green-500/10"
                  : "border-white/20 bg-white/5"
              } transition-all`}
            >
              <div className="workout-info">
                <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl">
                  {workout.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {workout.type === "cardio"
                    ? `${workout.duration} mins`
                    : `${workout.sets}x${workout.reps}`}
                </p>
              </div>
              <button
                className="complete-button flex items-center gap-2 px-4 py-2 rounded-full text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-medium text-sm border border-white/20 hover:bg-white/20 transition-all"
                onClick={() => handleCompleteWorkout(workout.id)}
              >
                <FiCheck />{" "}
                {workout.completed ? "Completed" : "✓ Mark Complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Exercise Search Section */}
      <div className="exercise-search">
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl">
          Search Exercises
        </h3>
        <div className="search-controls flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-600 focus:outline-none"
          >
            <option value="all">All Body Parts</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
          </select>
        </div>

        <div className="exercise-results grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="exercise-card p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-lg mb-1">
                {exercise.name}
              </h4>
              <p className="text-sm text-gray-300 mb-2">
                {exercise.bodyPart} • {exercise.equipment}
              </p>
              <button className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow hover:brightness-110">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
