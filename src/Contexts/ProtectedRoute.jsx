import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import LoadingPage from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const auth = getAuth();

    if (!token) {
      setRedirectTo("/");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists() && snap.data().profileComplete) {
          setRedirectTo(null); // allow access
        } else {
          setRedirectTo("/complete-profile");
        }
      } else {
        setRedirectTo("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingPage />;
  if (redirectTo) return <Navigate to={redirectTo} />;
  return children;
};

export default ProtectedRoute;
