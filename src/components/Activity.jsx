import React from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUserStats } from "../Contexts/useUserStats";

function Activity() {
  const [viewMode, setViewMode] = useState("day");
  const activityData = {
    day: [
      { hour: "6AM", steps: 500, calories: 120 },
      { hour: "9AM", steps: 1200, calories: 280 },
      { hour: "12PM", steps: 3500, calories: 450 },
      { hour: "3PM", steps: 4200, calories: 520 },
      { hour: "6PM", steps: 6500, calories: 680 },
      { hour: "9PM", steps: 8432, calories: 820 },
    ],
    week: [
      { day: "Mon", steps: 7500, calories: 1800 },
      { day: "Tue", steps: 8200, calories: 2100 },
      { day: "Wed", steps: 9100, calories: 2300 },
      { day: "Thu", steps: 8432, calories: 2200 },
      { day: "Fri", steps: 7800, calories: 2000 },
      { day: "Sat", steps: 10500, calories: 2500 },
      { day: "Sun", steps: 6200, calories: 1600 },
    ],
  };
  const {userStats, setUserStats} = useUserStats()
  return (
    <div className="activity-overview p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      {/* Chart Controls */}
      <div className="chart-controls flex justify-center gap-4 mb-6">
        {["day", "week", "month"].map((mode) => (
          <button
            key={mode}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none text-sm
              ${
                viewMode === mode
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg"
                  : "bg-white/10 border border-white/20 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 "
              }`}
            onClick={() => setViewMode(mode)}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="chart-container mb-8">
        {activityData[viewMode]?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={activityData[viewMode]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" stroke="#F472B6" />
              <YAxis stroke="#F472B6" />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="steps"
                stroke="#F472B6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-300">No activity data yet.</p>
        )}
      </div>

      {/* Activity Stats */}
      <div className="activity-stats bg-gray-900 border border-white/20 rounded-2xl p-6">
        <div className="steps-progress mb-6">
          <h4 className="text-lg font-semibold mb-2 text-white">
            Steps: {userStats.steps}/{userStats.stepGoal}
          </h4>
          <div className="progress-bar w-full h-4 bg-white/20 rounded-full overflow-hidden">
            <div
              className="progress-fill h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500"
              style={{
                width: `${(userStats.steps / userStats.stepGoal) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <h5 className="text-sm text-gray-400">Calories</h5>
            <p className="text-xl font-bold text-white">
              {userStats.calories} kcal
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <h5 className="text-sm text-gray-400">Distance</h5>
            <p className="text-xl font-bold text-white">
              {userStats.distance} km
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <h5 className="text-sm text-gray-400">Active Time</h5>
            <p className="text-xl font-bold text-white">
              {userStats.activeMinutes} mins
            </p>
          </div>
        </div>
      </div>

      {/* Motivational Tip */}
      <p className="text-center text-sm text-gray-400 mt-6 italic">
        "Consistency is more important than intensity. Keep moving forward!"
      </p>
    </div>
  );
}

export default Activity;
