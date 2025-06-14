import React from "react";
import { useState } from "react";
import { useUser } from "../Contexts/UserContext";
import { useUserStats } from "../Contexts/useUserStats";
function Header() {
  const [dateTime, setDateTime] = useState(new Date());
  const {userStats, setUserStats} = useUserStats();
  const { currentUser, userProfile } = useUser();

  const [waterIntake, setWaterIntake] = useState(0);
  const progressPercentage =
    ((userStats.currentWeight - userStats.goalWeight) /
      (userStats.currentWeight - userStats.goalWeight + 10)) *
    100;
  return (
    <header className="relative bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="user-greeting">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Good Morning, {userProfile.name || userProfile.displayName}!
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              {dateTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300 text-sm md:text-base flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              Sunny, 72°F
            </p>
          </div>

          <div className="summary-stats grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="stat-card bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-full mb-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl">
                {userStats.caloriesBurned}
              </h3>
              <p className="text-gray-300 text-xs">Calories</p>
            </div>

            <div className="stat-card bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex flex-col items-center">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-full mb-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl">
                {userStats.activeMinutes}
              </h3>
              <p className="text-gray-300 text-xs">Active mins</p>
            </div>

            <div className="stat-card bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex flex-col items-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full mb-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl">{waterIntake}/10</h3>
              <p className="text-gray-300 text-xs">Water</p>
            </div>

            <div className="stat-card bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex flex-col items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full mb-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl">
                {userStats.currentWeight} lbs
              </h3>
              <p className="text-gray-300 text-xs">
                {progressPercentage.toFixed(1)}% to goal
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
