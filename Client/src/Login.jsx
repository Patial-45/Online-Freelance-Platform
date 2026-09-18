import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { 
  LuLogIn, 
  LuUserPlus, 
  LuMail, 
  LuLock, 
  LuUser, 
  LuEye, 
  LuEyeOff, 
  LuCheckCircle2, 
  LuShieldCheck
} from "react-icons/lu";
import { LuSparkles } from "./Components/Icons";

const Login = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTarget = new URLSearchParams(location.search).get("redirect") || "/FindJobs";

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "freelancer",
    special: "Full Stack Engineer"
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    const res = await login(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg("Authentication successful! Welcome back.");
      setTimeout(() => {
        navigate(redirectTarget);
      }, 1000);
    } else {
      setErrorMsg(res.error || "Invalid credentials. Please verify your email and password.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (registerData.password !== registerData.cpassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (registerData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    const res = await register(registerData);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg("Account registered successfully! Welcome to VectraWork.");
      setTimeout(() => {
        navigate(redirectTarget);
      }, 1200);
    } else {
      setErrorMsg(res.error || "Registration failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col justify-between selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            {/* Header Tabs */}
            <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-8">
              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(true);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isLoginTab
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LuLogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(false);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  !isLoginTab
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LuUserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2">
                <LuCheckCircle2 className="w-4 h-4 shrink-0 text-teal-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Sign In Form */}
            {isLoginTab ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <LuMail className="w-4 h-4 text-teal-600" />
                    </div>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <LuLock className="w-4 h-4 text-teal-600" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? "Authenticating..." : "Sign In to Platform"}
                </button>
              </form>
            ) : (
              /* Create Account Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <LuUser className="w-4 h-4 text-teal-600" />
                    </div>
                    <input
                      type="text"
                      required
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      placeholder="Sarah Jenkins"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <LuMail className="w-4 h-4 text-teal-600" />
                    </div>
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="sarah@work.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Confirm
                    </label>
                    <input
                      type="password"
                      required
                      value={registerData.cpassword}
                      onChange={(e) => setRegisterData({ ...registerData, cpassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Account Primary Role
                  </label>
                  <select
                    value={registerData.role}
                    onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value="freelancer">Specialist Freelancer (Looking for Work)</option>
                    <option value="client">Client Enterprise (Hiring Talent)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? "Creating Account..." : "Complete Registration"}
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <LuShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Protected by 256-Bit TLS & JWT Escrow</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;