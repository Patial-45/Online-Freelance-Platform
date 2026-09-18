import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuSearch, LuArrowRight } from "react-icons/lu";

const Hero = ({ title, desc, img, placeholder, searchPath }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const isFreelancers = location.pathname.toLowerCase().includes("freelancer");
    const targetPath = searchPath || (isFreelancers ? "/FindFreelancer" : "/FindJobs");
    if (searchQuery.trim()) {
      navigate(`${targetPath}?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(targetPath);
    }
  };

  const bgStyle = img 
    ? { backgroundImage: img.startsWith("url") ? img : `url(${img})` }
    : { backgroundImage: `url("https://images.unsplash.com/photo-1498354178607-a79df2916198?auto=format&fit=crop&w=1920&q=80")` };

  return (
    <section 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900 bg-cover bg-center"
      style={bgStyle}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-serif drop-shadow-md">
          {title || "Find Jobs"}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-teal-100/90 max-w-2xl mx-auto font-sans font-medium drop-shadow">
          {desc || "The Best Place where you can find jobs and hire extraordinary talent."}
        </p>

        {/* Search Bar with Authentic Teal Submit Button */}
        <div className="pt-4 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex items-center p-1.5 rounded-full bg-white shadow-2xl border border-slate-200/80 transition-all focus-within:ring-2 focus-within:ring-teal-500"
          >
            <div className="pl-4 pr-2 text-slate-400">
              <LuSearch className="w-5 h-5 text-teal-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder || "Find Jobs..."}
              className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none px-2"
            />
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-600 hover:to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
