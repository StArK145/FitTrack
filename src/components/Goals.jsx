import React from "react";
import { useState } from "react";
import { FiTarget, FiStar } from "react-icons/fi";
import { useUserStats } from "../Contexts/useUserStats";

function Goals() {
  const {userStats, setUserStats} = useUserStats(); 
  const progressPercentage =
    ((userStats.currentWeight - userStats.goalWeight) /
      (userStats.currentWeight - userStats.goalWeight + 10)) *
    100;

  return (
    <div className="goals-section p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      {/* Goal Cards */}
      <div className="goal-cards grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Weight Goal */}
        <div className="goal-card p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-center">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-lg mb-4">
            Weight Goal
          </h3>
          <div className="progress-ring relative inline-block mb-4">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#weightGradient)"
                strokeWidth="8"
                strokeDasharray={`${progressPercentage * 3.14} 314`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient
                  id="weightGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                {progressPercentage.toFixed(1)}%
              </span>
              <p className="text-xs text-gray-300 text-center">
                {userStats.currentWeight} → {userStats.goalWeight} lbs
              </p>
            </div>
          </div>
        </div>

        {/* Steps Goal */}
        <div className="goal-card p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-center">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-lg mb-4">
            Steps Goal
          </h3>
          <div className="progress-bar-vertical relative w-8 h-32 mx-auto mb-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="progress-fill absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{
                height: `${Math.min(
                  (userStats.steps / userStats.stepGoal) * 100,
                  100
                )}%`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <FiTarget className="text-xs text-white" />
              </div>
            </div>
          </div>
          <p className="text-gray-300">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">
              {userStats.steps}
            </span>
            <span className="text-gray-400">/{userStats.stepGoal}</span>
          </p>
          <p className="text-xs text-gray-400">steps today</p>
        </div>

        {/* Exercise Minutes */}
        <div className="goal-card p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-center">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-lg mb-4">
            Exercise Minutes
          </h3>
          <div className="progress-circle relative inline-block mb-4">
            <svg width="100" height="100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#exerciseGradient)"
                strokeWidth="8"
                strokeDasharray={`${
                  (userStats.activeMinutes / userStats.exerciseGoal) * 251
                } 251`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient
                  id="exerciseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {userStats.activeMinutes}
              </span>
              <span className="text-xs text-gray-400">
                /{userStats.exerciseGoal} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="milestones mb-8 p-6 rounded-xl bg-white/10 border border-white/20">
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl mb-6">
          Milestones
        </h3>
        <div className="badges grid sm:grid-cols-3 gap-4">
          <div className="badge p-4 rounded-xl bg-white/10 border border-yellow-400/30 text-center hover:bg-white/20 transition-all">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
              <FiStar className="text-white text-xl" />
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-semibold">
              5-day streak
            </p>
            <p className="text-xs text-gray-400 mt-1">Keep it up!</p>
          </div>

          <div className="badge p-4 rounded-xl bg-white/10 border border-gray-400/30 text-center hover:bg-white/20 transition-all">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
              <FiStar className="text-white text-xl" />
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400 font-semibold">
              10K steps
            </p>
            <p className="text-xs text-gray-400 mt-1">Daily goal achieved</p>
          </div>

          <div className="badge p-4 rounded-xl bg-white/10 border border-orange-600/30 text-center hover:bg-white/20 transition-all">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
              <FiStar className="text-white text-xl" />
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-semibold">
              New PR
            </p>
            <p className="text-xs text-gray-400 mt-1">Personal record</p>
          </div>
        </div>
      </div>

      {/* Daily Motivation */}
      <div className="motivation p-6 rounded-xl bg-white/10 border border-white/20 text-center">
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl mb-6">
          Daily Motivation
        </h3>
        <blockquote className="relative">
          <div className="text-4xl text-pink-400/30 absolute -top-2 -left-2">
            "
          </div>
          <p className="text-lg text-gray-200 italic mb-4 relative z-10">
            The secret of getting ahead is getting started.
          </p>
          <footer className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 font-medium">
            - Mark Twain
          </footer>
          <div className="text-4xl text-pink-400/30 absolute -bottom-6 -right-2 rotate-180">
            "
          </div>
        </blockquote>
      </div>
    </div>
  );
}

export default Goals;
