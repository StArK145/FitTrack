import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useUser } from "../Contexts/UserContext";
import Activity from "../components/Activity";
import Workouts from "../components/Workouts";
import Nutrition from "../components/Nutrition";
import Goals from "../components/Goals";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("activity");
  return (
    <div className="fitness-dashboard">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse"></div>
      </div>

      {/* Header Section */}
      <Header />

      <nav className="flex space-x-2 mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/20">
        <button
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 
      ${
        activeTab === "activity"
          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg"
          : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      }`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 
      ${
        activeTab === "workouts"
          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg"
          : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      }`}
          onClick={() => setActiveTab("workouts")}
        >
          Workouts
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 
      ${
        activeTab === "nutrition"
          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg"
          : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      }`}
          onClick={() => setActiveTab("nutrition")}
        >
          Nutrition
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 
      ${
        activeTab === "goals"
          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg"
          : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      }`}
          onClick={() => setActiveTab("goals")}
        >
          Goals
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {activeTab === "activity" && <Activity />}

        {activeTab === "workouts" && <Workouts />}

        {activeTab === "nutrition" && <Nutrition />}

        {activeTab === "goals" && <Goals />}
      </main>
    </div>
  );
};

export default Dashboard;
