import React, { useState, useEffect } from "react";

const LoadingPage = ({
  loadingText = "Preparing your fitness journey...",
  subText = "Setting up your personalized experience",
  progress = null, // Optional progress percentage (0-100)
}) => {
  const [dots, setDots] = useState("");
  const [currentProgress, setCurrentProgress] = useState(0);

  // Animated dots effect for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Simulate progress if no progress prop is provided
  useEffect(() => {
    if (progress === null) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) return 0; // Reset to create continuous loading
          return prev + Math.random() * 15;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setCurrentProgress(progress);
    }
  }, [progress]);

  const loadingSteps = [
    {
      icon: "👤",
      text: "Setting up your profile",
      completed: currentProgress > 20,
    },
    {
      icon: "📊",
      text: "Calculating your metrics",
      completed: currentProgress > 40,
    },
    {
      icon: "🎯",
      text: "Creating your goals",
      completed: currentProgress > 60,
    },
    { icon: "🏋️", text: "Preparing workouts", completed: currentProgress > 80 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden lg:[-ms-overflow-style:none] lg:[scrollbar-width:none]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.2),transparent_50%)] animate-ping"></div>
      </div>

      <div className="relative w-full max-w-md overflow-hidden">
        {/* Logo/Header */}
        <div className="text-center mb-12 overflow-hidden">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-6 shadow-2xl animate-bounce mx-auto">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ animation: "spin 2s linear infinite" }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold text-white mb-3"
            style={{ animation: "pulse 2s infinite" }}
          >
            FitTrack
          </h1>
          <p className="text-gray-300 text-lg">
            Transform your fitness journey
          </p>
        </div>

        {/* Main Loading Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 overflow-hidden">
          {/* Primary Loading Animation */}
          <div className="text-center mb-8">
            <div className="relative mb-6 flex justify-center">
              {/* Spinning Ring */}
              <div className="w-20 h-20 flex-shrink-0">
                <svg
                  className="w-20 h-20"
                  viewBox="0 0 24 24"
                  style={{ animation: "spin 2s linear infinite" }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="60"
                    strokeDashoffset="15"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Pulsing Center Dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
                    style={{
                      animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  ></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {loadingText}
              {dots}
            </h2>
            <p className="text-gray-300 text-sm mb-6">{subText}</p>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${Math.min(currentProgress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
              </div>
            </div>

            {/* Progress Percentage */}
            <p className="text-white/80 text-sm font-medium">
              {Math.round(Math.min(currentProgress, 100))}% Complete
            </p>
          </div>

          {/* Loading Steps */}
          <div className="space-y-4 overflow-hidden">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-500 flex-shrink-0 ${
                    step.completed
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 transform scale-105"
                      : "bg-white/20"
                  }`}
                  style={
                    !step.completed ? { animation: "pulse 2s infinite" } : {}
                  }
                >
                  {step.completed ? "✓" : step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium transition-all duration-500 truncate ${
                      step.completed ? "text-green-300" : "text-white/70"
                    }`}
                  >
                    {step.text}
                  </p>
                </div>
                {step.completed && (
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"
                    style={{
                      animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Loading Tips */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Pro Tip</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Consistency is key to achieving your fitness goals. Even small daily
            efforts compound into remarkable results over time.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-xs overflow-hidden">
          <p style={{ animation: "pulse 2s infinite" }}>
            Powered by advanced fitness algorithms
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
