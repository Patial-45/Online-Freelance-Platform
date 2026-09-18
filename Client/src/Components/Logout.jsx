import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
      } catch (err) {
        console.warn("Logout error:", err);
      } finally {
        navigate("/");
      }
    };
    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-3 text-slate-600">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold">Signing out safely...</p>
      </div>
    </div>
  );
};

export default Logout;
