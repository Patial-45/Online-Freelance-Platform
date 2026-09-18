import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LuBriefcase, 
  LuUsers, 
  LuPlusCircle, 
  LuLogOut, 
  LuLogIn, 
  LuMenu, 
  LuX, 
  LuChevronDown,
  LuInfo
} from "react-icons/lu";

const Navbar = ({ onAboutClick }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Scroll Progress and Sticky Navbar
  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollTop(scrolled);
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  const handleAboutNavigation = (e) => {
    if (location.pathname === "/" && onAboutClick) {
      e.preventDefault();
      onAboutClick();
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/FindJobs" },
    { name: "Find Freelancers", path: "/FindFreelancer" },
    { name: "About Us", path: "/about", onClick: handleAboutNavigation },
  ];

  return (
    <>
      {/* Dynamic Top Scroll Progress Bar */}
      <div className="progressbar">
        <div className="progressbarIn" style={{ width: `${scrollTop}%` }} />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2.5"
            : "bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* VectraWork Brand Identity */}
            <Link to="/" className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-102">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center shadow-md shadow-teal-500/10 group-hover:border-teal-400/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-teal-400 stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
                  <path d="M4 4l8 16 8-16" />
                  <path d="M9 10l3 6 3-6" stroke="#00c8aa" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                  Vectra
                </span>
                <span className="text-2xl font-extrabold text-teal-600 tracking-tight font-sans">
                  Work
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 ml-1 mb-0.5 animate-pulse" />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-50/90 border border-slate-200/80 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-md">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={link.onClick}
                  className={({ isActive }) =>
                    `px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 relative ${
                      isActive && (link.path === "/" ? location.pathname === "/" : true)
                        ? "text-teal-700 bg-teal-50 shadow-xs font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/FindJobs/PostJobs"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all hover:shadow-xs"
              >
                <LuPlusCircle className="w-3.5 h-3.5 text-teal-600" />
                <span>Post a Job</span>
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-teal-500 shadow-sm transition-all"
                  >
                    <img
                      src={user?.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={user?.name || "User"}
                      className="w-7 h-7 rounded-full object-cover border border-teal-500"
                    />
                    <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">
                      {user?.name || "Account"}
                    </span>
                    <LuChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                        <p className="text-xs text-teal-600 capitalize font-medium">{user?.role || "Specialist"}</p>
                      </div>

                      <Link
                        to="/FindJobs/Profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition-colors"
                      >
                        <span>Dashboard & Profile</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LuLogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/Login"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <LuLogIn className="w-3.5 h-3.5" />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    if (link.onClick) link.onClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/FindJobs/PostJobs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-teal-700 hover:bg-teal-50 flex items-center gap-2"
              >
                <LuPlusCircle className="w-4 h-4" />
                <span>Post a Job</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/FindJobs/Profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    My Profile ({user?.name})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 text-left"
                  >
                    <LuLogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/Login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600"
                >
                  <LuLogIn className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
