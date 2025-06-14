// useUserStats.js
import { createContext, useContext, useState } from "react";

const UserStatsContext = createContext();

export const UserStatsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    caloriesBurned: 420,
    activeMinutes: 45,
    currentWeight: 165,
    goalWeight: 155,
    steps: 8432,
    stepGoal: 10000,
    exerciseGoal: 60,
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  });

  return (
    <UserStatsContext.Provider value={{ userStats, setUserStats }}>
      {children}
    </UserStatsContext.Provider>
  );
};

// 🧠 Custom hook to use in any component
export const useUserStats = () => {
  const context = useContext(UserStatsContext);
  if (!context) {
    throw new Error("useUserStats must be used within a UserStatsProvider");
  }
  return context;
};
