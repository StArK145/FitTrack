import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../services/firebase";
import LoadingPage from "../components/Loading";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "phone"

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setPhone("");
    setOtp("");
    setShowOtpInput(false);
  };

  const StoreToken = () => {
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then((token) => {
        // Store it in localStorage
        localStorage.setItem("authToken", token);
        console.log("Token stored!");
      })
      .catch((error) => {
        console.error("Error getting token:", error);
      });
  };

  // Separate email authentication handler
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Email login successful:", email);
        StoreToken();
        navigate("/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
        console.log("Email registration successful:", email);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Separate Google authentication handler
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // Only create document if new user
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.name,
          createdAt: new Date(),
        });
      }

      console.log("Google authentication successful");
      StoreToken();
      navigate("/dashboard");
    } catch (err) {
      setError("Google authentication failed: " + err.message);
    }
  };

  // Main auth handler that routes to the appropriate method
  const handleAuth = async (e) => {
    e.preventDefault();
    if (loginMethod === "email") {
      await handleEmailAuth(e);
    } else if (loginMethod === "phone" && !showOtpInput) {
      await handleSendOtp();
    } else if (loginMethod === "phone" && showOtpInput) {
      await handleVerifyOtp();
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FitTrack</h1>
          <p className="text-gray-300">Transform your fitness journey</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back!" : "Join FitTrack"}
            </h2>
            <p className="text-gray-300 text-sm">
              {isLogin
                ? "Ready to crush your goals?"
                : "Start your fitness transformation"}
            </p>
          </div>

          {/* Dynamic Input Fields */}
          <div className="space-y-6">
            <>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </>

            <button
              type="button"
              onClick={handleAuth}
              className={`w-full ${
                loginMethod === "email"
                  ? "bg-gradient-to-r from-pink-500 to-orange-500"
                  : showOtpInput
                  ? "bg-gradient-to-r from-green-500 to-teal-500"
                  : "bg-gradient-to-r from-green-500 to-teal-500"
              } text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
            >
              {loginMethod === "email"
                ? isLogin
                  ? "Sign In"
                  : "Create Account"
                : showOtpInput
                ? "Verify OTP"
                : "Send OTP"}
            </button>
          </div>

          {/* Divider - Only show for email login */}
          {loginMethod === "email" && (
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-gray-300 text-sm">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
          )}

          {/* Google Login - Only show for email login */}
          {loginMethod === "email" && (
            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-2xl font-medium transition-all duration-300 mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 0 1 0-24c3.1 0 5.9 1.2 8 3.1l5.7-5.7A19.9 19.9 0 0 0 24 4a20 20 0 1 0 19.6 16.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.3l6.6 4.9A11.9 11.9 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 4 24c0 3.1.7 6.1 2.3 8.7l6.6-5.1A11.9 11.9 0 0 1 6.3 14.3z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.3 0 9.7-2 12.9-5.2l-6.3-5.2a12 12 0 0 1-18.1-6.3l-6.6 5.1A20 20 0 0 0 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.4 5.2l6.3 5.2C40.9 34.8 44 29.9 44 24c0-1.2-.1-2.4-.4-3.5z"
                />
              </svg>
              Continue with Google
            </button>
          )}

          {/* Hidden reCAPTCHA container for phone auth */}
          {loginMethod === "phone" && <div id="recaptcha-container"></div>}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl">
              <p className="text-red-300 text-center text-sm">{error}</p>
            </div>
          )}

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-300 text-sm">
              {isLogin ? "New to FitTrack?" : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-pink-400 hover:text-pink-300 font-semibold hover:underline transition-colors duration-300"
              >
                {isLogin ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-xs">
          <p>By continuing, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
