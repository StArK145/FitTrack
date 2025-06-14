import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { UserStatsProvider } from "./Contexts/useUserStats.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <UserStatsProvider>
        <App />
      </UserStatsProvider>
    </UserProvider>
  </StrictMode>
);
