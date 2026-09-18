import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  LuUser, 
  LuMail, 
  LuBriefcase, 
  LuPlusCircle, 
  LuCheckCircle2, 
  LuShieldCheck, 
  LuDollarSign, 
  LuCalendar,
  LuLogOut,
  LuBuilding2,
  LuGlobe,
  LuMapPin,
  LuFileText,
  LuEdit3,
  LuX,
  LuClock,
  LuChevronRight,
  LuCheck,
  LuBan,
  LuLayers
} from "react-icons/lu";
import { LuSparkles } from "./Icons";

const initialEmployerProposals = [
  {
    id: "prop-1",
    jobTitle: "Modern Next.js 15 & Node.js Scalable Platform Architecture",
    freelancerName: "Alex Vance",
    freelancerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    freelancerRole: "Senior Full Stack Architect",
    bidAmount: 4200,
    deliveryTime: "4 weeks",
    pitch: "I have 7+ years architecting enterprise React & Next.js systems with Prisma and PostgreSQL. I can guarantee sub-100ms response times and full CI/CD deployment.",
    status: "Under Review"
  },
  {
    id: "prop-2",
    jobTitle: "Fine-Tuned LLM Autonomous Agent for Customer Support",
    freelancerName: "Dr. Elena Rostova",
    freelancerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    freelancerRole: "Lead AI & RAG Engineer",
    bidAmount: 5200,
    deliveryTime: "6 weeks",
    pitch: "Engineered RAG pipelines for Fortune 500 fintech. Experienced in pgvector, LangChain, and Claude 3.5 Sonnet agent tool calling with human escalation loops.",
    status: "Shortlisted"
  },
  {
    id: "prop-3",
    jobTitle: "Mobile FinTech Design System & Interactive Figma Component Library",
    freelancerName: "Marcus Sterling",
    freelancerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    freelancerRole: "Staff Product Designer",
    bidAmount: 3200,
    deliveryTime: "3 weeks",
    pitch: "Led Figma design tokens for 3 fintech unicorns. I provide WCAG AA compliance, dark mode variants, auto-layout 5.0, and developer-ready Storybook sync.",
    status: "Under Review"
  }
];

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Mode: "client" or "freelancer"
  const [activeTab, setActiveTab] = useState(user?.role === "client" ? "client" : "freelancer");

  // Client Profile State (persisted in localStorage)
  const [clientProfile, setClientProfile] = useState(() => {
    const saved = localStorage.getItem("freelanster_client_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      companyName: user?.name ? `${user.name} Labs` : "Apex Cloud Ventures",
      tagline: "Building high-performance decentralized & cloud infrastructure",
      industry: "Software & Artificial Intelligence",
      website: "https://apexcloud.ventures",
      location: "San Francisco, CA / Remote",
      companySize: "11-50 employees",
      escrowBalance: "14,500"
    };
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...clientProfile });
  const [proposals, setProposals] = useState(initialEmployerProposals);
  const [actionNotice, setActionNotice] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/Login");
  };

  const handleSaveClientProfile = (e) => {
    e.preventDefault();
    setClientProfile(editFormData);
    localStorage.setItem("freelanster_client_profile", JSON.stringify(editFormData));
    setEditModalOpen(false);
    setActionNotice("Company profile updated successfully!");
    setTimeout(() => setActionNotice(""), 3000);
  };

  const handleUpdateProposalStatus = (propId, newStatus) => {
    setProposals(prev => prev.map(p => {
      if (p.id === propId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
    setActionNotice(`Proposal status updated to: ${newStatus}`);
    setTimeout(() => setActionNotice(""), 3000);
  };

  const displayName = user?.name || "Verified Professional";
  const displayEmail = user?.email || "specialist@freelanster.com";
  const displayRole = user?.role || "freelancer";
  const displayTitle = user?.title || "Senior Specialist";
  const displayAvatar = user?.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-1 w-full">
        {/* Role Toggle Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Enterprise Control Center</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans mt-0.5">Account & Workspace</h1>
          </div>

          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab("freelancer")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "freelancer"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              👨‍💻 Specialist Dashboard
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "client"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🏢 Client / Employer Dashboard
            </button>
          </div>
        </div>

        {/* Global Action Toast Notification */}
        {actionNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <LuCheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice("")} className="text-teal-600 hover:text-teal-800">
              <LuX className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: CLIENT / EMPLOYER DASHBOARD                        */}
        {/* ========================================================= */}
        {activeTab === "client" && (
          <div className="space-y-8 animate-fade-in">
            {/* Enterprise Client Card Header */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white">
                    <LuBuilding2 className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-2xl font-bold text-slate-900">{clientProfile.companyName}</h2>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold">
                        <LuShieldCheck className="w-3.5 h-3.5" />
                        Verified Employer
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{clientProfile.tagline}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 flex-wrap">
                      <span className="flex items-center gap-1"><LuGlobe className="w-3.5 h-3.5 text-slate-400" />{clientProfile.website}</span>
                      <span className="flex items-center gap-1"><LuMapPin className="w-3.5 h-3.5 text-slate-400" />{clientProfile.location}</span>
                      <span className="flex items-center gap-1"><LuBriefcase className="w-3.5 h-3.5 text-slate-400" />{clientProfile.industry}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button
                    onClick={() => {
                      setEditFormData({ ...clientProfile });
                      setEditModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <LuEdit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>

                  <Link
                    to="/FindJobs/PostJobs"
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <LuPlusCircle className="w-4 h-4" />
                    <span>Post Mandate</span>
                  </Link>
                </div>
              </div>

              {/* Escrow Metrics Banner */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100">
                  <p className="text-2xl font-bold text-teal-700 font-sans">${clientProfile.escrowBalance}</p>
                  <p className="text-xs text-teal-800 mt-1 font-medium">Funded Escrow Vault</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-slate-900 font-sans">3</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Active Mandates</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-slate-900 font-sans">{proposals.length}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Received Proposals</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-cyan-600 font-sans">100%</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Escrow Release Rate</p>
                </div>
              </div>
            </div>

            {/* Received Proposals & Applicant Review Management */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Received Specialist Proposals</h3>
                  <p className="text-xs text-slate-500 font-medium">Review bids, check credentials, and disburse milestone escrow funds.</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {proposals.length} Applications
                </span>
              </div>

              <div className="space-y-4">
                {proposals.map((prop) => (
                  <div 
                    key={prop.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={prop.freelancerAvatar}
                        alt={prop.freelancerName}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900">{prop.freelancerName}</h4>
                          <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                            {prop.freelancerRole}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            prop.status === "Accepted & Funded" 
                              ? "bg-emerald-100 text-emerald-800"
                              : prop.status === "Shortlisted"
                                ? "bg-amber-100 text-amber-800"
                                : prop.status === "Declined"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-slate-200 text-slate-700"
                          }`}>
                            {prop.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-600 mt-1">
                          Applied for: <span className="text-slate-900">{prop.jobTitle}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
                          "{prop.pitch}"
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-700 mt-2">
                          <span>Bid: <strong className="text-teal-600 font-sans">${prop.bidAmount} USD</strong></span>
                          <span>Delivery: <strong className="text-slate-900">{prop.deliveryTime}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                      <button
                        onClick={() => handleUpdateProposalStatus(prop.id, "Shortlisted")}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleUpdateProposalStatus(prop.id, "Accepted & Funded")}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                      >
                        <LuCheck className="w-3.5 h-3.5" />
                        <span>Accept & Escrow</span>
                      </button>
                      <button
                        onClick={() => handleUpdateProposalStatus(prop.id, "Declined")}
                        className="p-2 rounded-xl bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 transition-colors"
                        title="Decline proposal"
                      >
                        <LuBan className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Posted Mandates List */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Your Active Mandate Listings</h3>
                  <p className="text-xs text-slate-500 font-medium">Broadcasted projects currently receiving bids from specialists.</p>
                </div>
                <Link
                  to="/FindJobs/PostJobs"
                  className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <LuPlusCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>New Mandate</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      Full Stack Development
                    </span>
                    <span className="text-xs font-bold text-slate-900">$4,500 USD</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Modern Next.js 15 & Node.js Scalable Architecture</h4>
                  <p className="text-xs text-slate-500">Timeline: 1-2 months • Milestone Escrow Protected</p>
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200/80">
                    <span>1 Applicant Received</span>
                    <span className="text-teal-600 font-bold">Active & Open</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                      AI & Machine Learning
                    </span>
                    <span className="text-xs font-bold text-slate-900">$5,500 USD</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Fine-Tuned LLM Autonomous Agent with RAG</h4>
                  <p className="text-xs text-slate-500">Timeline: 2 months • Milestone Escrow Protected</p>
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200/80">
                    <span>1 Applicant Received</span>
                    <span className="text-teal-600 font-bold">Active & Open</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SPECIALIST / FREELANCER DASHBOARD                  */}
        {/* ========================================================= */}
        {activeTab === "freelancer" && (
          <div className="space-y-8 animate-fade-in">
            {/* Profile Card Header */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="relative">
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-24 h-24 rounded-3xl object-cover border-2 border-teal-500/40 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-teal-600 text-white rounded-full shadow-xs">
                    <LuShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                        {displayName}
                      </h1>
                      <p className="text-sm font-semibold text-teal-600 mt-0.5">{displayTitle}</p>
                      <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-medium">
                        <LuMail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{displayEmail}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 justify-center sm:justify-end">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <LuLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-slate-900 font-sans">100%</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Job Success Score</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-teal-600 font-sans">Verified</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Identity & Escrow</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-slate-900 font-sans">4</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Active Projects</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl font-bold text-cyan-600 font-sans">Top 3%</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Specialist Rank</p>
                </div>
              </div>
            </div>

            {/* Dashboard Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Actions Panel */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Platform Workflows</h3>
                <p className="text-xs text-slate-500 font-medium">Jump directly into finding work or discovering specialized talent.</p>

                <div className="space-y-2.5 pt-2">
                  <Link
                    to="/FindJobs"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-medium text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LuBriefcase className="w-5 h-5 text-teal-600" />
                      <span>Browse Open Opportunities</span>
                    </div>
                    <span className="text-xs text-teal-600 font-bold">Explore →</span>
                  </Link>

                  <Link
                    to="/FindFreelancer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-medium text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LuUser className="w-5 h-5 text-cyan-600" />
                      <span>Explore Verified Specialists</span>
                    </div>
                    <span className="text-xs text-cyan-600 font-bold">Browse →</span>
                  </Link>

                  <Link
                    to="/FindJobs/PostJobs"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-medium text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LuPlusCircle className="w-5 h-5 text-indigo-600" />
                      <span>Create a Project Listing</span>
                    </div>
                    <span className="text-xs text-indigo-600 font-bold">Publish →</span>
                  </Link>
                </div>
              </div>

              {/* Account Security & Status */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Security & Verification</h3>
                <p className="text-xs text-slate-500 font-medium">Your account credentials and escrow protection status.</p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium">
                    <span className="text-slate-500">Account Type</span>
                    <span className="text-slate-800 font-bold capitalize">{displayRole} Tier</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium">
                    <span className="text-slate-500">JWT Authentication</span>
                    <span className="text-teal-600 font-bold">Secure & Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium">
                    <span className="text-slate-500">Cloud Escrow Vault</span>
                    <span className="text-cyan-600 font-bold">Funded & Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Edit Enterprise Client Profile */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <LuBuilding2 className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-slate-900">Edit Enterprise Profile</h3>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveClientProfile} className="space-y-4 text-xs font-bold text-slate-700">
                <div>
                  <label className="block mb-1.5 uppercase tracking-wider">Company / Entity Name *</label>
                  <input
                    type="text"
                    value={editFormData.companyName}
                    onChange={(e) => setEditFormData({ ...editFormData, companyName: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 uppercase tracking-wider">Tagline / Mission</label>
                  <input
                    type="text"
                    value={editFormData.tagline}
                    onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 uppercase tracking-wider">Industry</label>
                    <input
                      type="text"
                      value={editFormData.industry}
                      onChange={(e) => setEditFormData({ ...editFormData, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 uppercase tracking-wider">Company Size</label>
                    <select
                      value={editFormData.companySize}
                      onChange={(e) => setEditFormData({ ...editFormData, companySize: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="200+ enterprise">200+ enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 uppercase tracking-wider">Website URL</label>
                    <input
                      type="text"
                      value={editFormData.website}
                      onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 uppercase tracking-wider">Headquarters / Location</label>
                    <input
                      type="text"
                      value={editFormData.location}
                      onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
