import React from "react";
import { Link } from "react-router-dom";
import { LuCompass, LuArrowLeft } from "react-icons/lu";
import { LuSparkles } from "./Icons";

const Error = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">
      <div className="text-center max-w-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto shadow-md">
          <LuCompass className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl font-extrabold font-serif text-slate-900 tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Page Beyond the Frontier
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            The project, specialist profile, or platform route you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <LuArrowLeft className="w-4 h-4" />
            <span>Return to Marketplace</span>
          </Link>
          <Link
            to="/FindJobs"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
          >
            Browse Open Roles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
