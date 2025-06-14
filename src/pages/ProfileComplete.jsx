import { db } from "../services/firebase"; // Import your Firestore instance
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProfileComplete = () => {
  const [profile, setProfile] = useState({
    name: "",
    birthDate: "",
    weight: "",
    height: "",
    gender: "Male",
    activityLevel: "Moderate",
    fitnessGoal: "Stay fit",
  });
  const navigate = useNavigate();

  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    const { weight, height } = profile;
    if (weight && height) {
      const h = height / 100;
      const bmiVal = (weight / (h * h)).toFixed(1);
      setBmi(bmiVal);

      if (bmiVal < 18.5) setBmiCategory("Underweight");
      else if (bmiVal < 25) setBmiCategory("Normal");
      else if (bmiVal < 30) setBmiCategory("Overweight");
      else setBmiCategory("Obese");
    }
  }, [profile.weight, profile.height]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare the profile data
      const profileData = {
        ...profile,
        bmi: Number(bmi),
        bmiCategory,
        profileComplete: true,
        updatedAt: new Date(), // Add update timestamp
      };

      // Update the user's document in Firestore
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });

      // OR if you want to update specific fields without overwriting:
      // await updateDoc(doc(db, "users", user.uid), profileData);

      alert("Profile completed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error storing profile data: ", error);
      alert("Error saving profile. Please try again.");
    }
  };
  const getBmiCategoryColor = () => {
    switch (bmiCategory) {
      case "Underweight":
        return "text-blue-400";
      case "Normal":
        return "text-green-400";
      case "Overweight":
        return "text-yellow-400";
      case "Obese":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-300">
            Let's personalize your fitness journey
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Tell Us About Yourself
            </h2>
            <p className="text-gray-300 text-sm">
              We'll use this to create your personalized plan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <input
                name="name"
                onChange={handleChange}
                value={profile.name}
                required
                placeholder="Full Name"
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Birth Date */}
            <div className="relative">
              <input
                type="date"
                name="birthDate"
                onChange={handleChange}
                value={profile.birthDate}
                required
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Weight and Height Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  value={profile.weight}
                  required
                  placeholder="Weight (kg)"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-400">kg</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="height"
                  onChange={handleChange}
                  value={profile.height}
                  required
                  placeholder="Height (cm)"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-400">cm</span>
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="relative">
              <select
                name="gender"
                onChange={handleChange}
                value={profile.gender}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option value="Male" className="bg-gray-800">
                  Male
                </option>
                <option value="Female" className="bg-gray-800">
                  Female
                </option>
                <option value="Other" className="bg-gray-800">
                  Other
                </option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Activity Level */}
            <div className="relative">
              <select
                name="activityLevel"
                onChange={handleChange}
                value={profile.activityLevel}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option value="Sedentary" className="bg-gray-800">
                  Sedentary (Little to no exercise)
                </option>
                <option value="Moderate" className="bg-gray-800">
                  Moderate (3-5 days/week)
                </option>
                <option value="Active" className="bg-gray-800">
                  Active (6-7 days/week)
                </option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Fitness Goal */}
            <div className="relative">
              <select
                name="fitnessGoal"
                onChange={handleChange}
                value={profile.fitnessGoal}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option value="Stay fit" className="bg-gray-800">
                  Stay Fit & Healthy
                </option>
                <option value="Lose weight" className="bg-gray-800">
                  Lose Weight
                </option>
                <option value="Build muscle" className="bg-gray-800">
                  Build Muscle
                </option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </div>

            {/* BMI Display */}
            {bmi && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
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
                    <div>
                      <p className="text-white font-semibold">Your BMI</p>
                      <p className="text-gray-300 text-sm">Body Mass Index</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{bmi}</p>
                    <p
                      className={`text-sm font-medium ${getBmiCategoryColor()}`}
                    >
                      {bmiCategory}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-xs">
          <p>
            Your information is secure and will be used to personalize your
            experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;
