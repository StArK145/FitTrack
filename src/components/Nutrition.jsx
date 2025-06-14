import React from "react";
import { useState } from "react";
import { FiEdit, FiDroplet } from "react-icons/fi";
import { PieChart } from "recharts";
import { useUserStats } from "../Contexts/useUserStats";

function Nutrition() {
  const {userStats, setUserStats} = useUserStats();
  const [waterIntake, setWaterIntake] = useState(0);
  const addWaterIntake = () => {
    if (waterIntake < 10) {
      setWaterIntake(waterIntake + 1);
    }
  };

  return (
    <div className="nutrition-section p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      {/* Meal Tracker */}
      <div className="meal-tracker mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl">
            Meal Tracker
          </h2>
          <button className="edit-button flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all hover:brightness-110">
            <FiEdit /> Plan Meals
          </button>
        </div>

        <div className="meal-cards grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="meal-card p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-lg mb-3">
              Breakfast
            </h3>
            {userStats.meals.breakfast.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {userStats.meals.breakfast.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-pink-400">{item.calories} cal</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm mb-4">No items logged</p>
            )}
            <button className="w-full px-3 py-2 text-sm rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow hover:brightness-110 transition-all">
              Add Food
            </button>
          </div>

          <div className="meal-card p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-lg mb-3">
              Lunch
            </h3>
            {userStats.meals.lunch.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {userStats.meals.lunch.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-pink-400">{item.calories} cal</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm mb-4">No items logged</p>
            )}
            <button className="w-full px-3 py-2 text-sm rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow hover:brightness-110 transition-all">
              Add Food
            </button>
          </div>

          <div className="meal-card p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-lg mb-3">
              Dinner
            </h3>
            {userStats.meals.dinner.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {userStats.meals.dinner.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-pink-400">{item.calories} cal</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm mb-4">No items logged</p>
            )}
            <button className="w-full px-3 py-2 text-sm rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow hover:brightness-110 transition-all">
              Add Food
            </button>
          </div>

          <div className="meal-card p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-lg mb-3">
              Snacks
            </h3>
            {userStats.meals.snacks.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {userStats.meals.snacks.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-pink-400">{item.calories} cal</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm mb-4">No items logged</p>
            )}
            <button className="w-full px-3 py-2 text-sm rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow hover:brightness-110 transition-all">
              Add Food
            </button>
          </div>
        </div>

        {/* Daily Macros */}
        <div className="macros-summary p-6 rounded-xl bg-white/10 border border-white/20">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl mb-4">
            Daily Macros
          </h3>
          <div className="macros-chart flex flex-col md:flex-row items-center gap-6">
            <div className="chart-container">
              <PieChart
                width={200}
                height={200}
                data={[
                  { name: "Protein", value: 120, fill: "#ff6b6b" },
                  { name: "Carbs", value: 200, fill: "#48dbfb" },
                  { name: "Fat", value: 50, fill: "#feca57" },
                ]}
              >
                {/* Pie chart components */}
              </PieChart>
            </div>
            <div className="macros-legend space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-400"></div>
                <span className="text-gray-300">
                  Protein:{" "}
                  <span className="text-pink-400 font-semibold">120g</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                <span className="text-gray-300">
                  Carbs:{" "}
                  <span className="text-pink-400 font-semibold">200g</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <span className="text-gray-300">
                  Fat: <span className="text-pink-400 font-semibold">50g</span>
                </span>
              </div>
              <div className="pt-2 border-t border-white/20">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-lg">
                  Total: 1850 kcal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="water-tracker p-6 rounded-xl bg-white/10 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-xl">
            Water Intake
          </h3>
          <span className="text-gray-300 text-sm">
            {waterIntake}/10 glasses
          </span>
        </div>

        <div className="water-display flex flex-wrap gap-3 mb-6 justify-center">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`water-glass w-8 h-10 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                index < waterIntake
                  ? "border-blue-400 bg-blue-400/30 text-blue-300"
                  : "border-white/30 text-white/50 hover:border-blue-400/50"
              }`}
              onClick={() => setWaterIntake(index + 1)}
            >
              <FiDroplet className="text-sm" />
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            className="add-water px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow hover:brightness-110 transition-all"
            onClick={addWaterIntake}
          >
            Add Glass
          </button>
          <button
            className="reset-water px-6 py-2 rounded-full border border-white/20 text-gray-300 hover:bg-white/10 transition-all"
            onClick={() => setWaterIntake(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nutrition;
