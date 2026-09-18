import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jobsApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoToTop from "./GoToTop";
import { 
  LuPlusCircle, 
  LuDollarSign, 
  LuClock, 
  LuTag, 
  LuBriefcase, 
  LuCheckCircle2, 
  LuArrowLeft, 
  LuArrowRight, 
  LuShieldAlert, 
  LuShieldCheck,
  LuLayers,
  LuFileText,
  LuBuilding2
} from "react-icons/lu";
import { LuSparkles } from "./Icons";

const categories = [
  "Graphic Design",
  "Article Writing",
  "Video Editing",
  "Accountant",
  "Android Developer",
  "Data Entry",
  "Logistics",
  "AI & Machine Learning",
  "Full Stack Development",
  "UI/UX & Product Design",
  "Cloud & DevOps",
  "Mobile Apps (iOS & Flutter)",
  "Cybersecurity & Auditing",
  "Digital Marketing & SEO"
];

const categorySkillSuggestions = {
  "Graphic Design": ["Branding", "Illustrator", "Figma", "3D Icons", "Photoshop"],
  "Article Writing": ["Technical Writing", "API Docs", "SEO Copy", "Markdown", "Content Strategy"],
  "Video Editing": ["Premiere Pro", "After Effects", "Color Grading", "Motion Design", "Sound Design"],
  "Accountant": ["Financial Modeling", "GAAP Accounting", "Tax Strategy", "QuickBooks", "Escrow Auditing"],
  "Android Developer": ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "CameraX"],
  "Data Entry": ["Data Cleansing", "HubSpot", "Shopify", "Excel/Sheets", "CRM Migration"],
  "Logistics": ["Routing Algorithms", "Freight Costing", "Supply Chain", "ERP Integration"],
  "AI & Machine Learning": ["Python", "LangChain", "Vector DB", "OpenAI API", "Claude API", "RAG"],
  "Full Stack Development": ["Next.js 15", "React 19", "Node.js", "TypeScript", "Tailwind CSS", "Prisma"],
  "UI/UX & Product Design": ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing"],
  "Cloud & DevOps": ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Datadog"],
  "Mobile Apps (iOS & Flutter)": ["Flutter", "Dart", "WebRTC", "iOS Swift", "Firebase"],
  "Cybersecurity & Auditing": ["Solidity Audit", "Penetration Testing", "Slither", "OWASP", "Zero-Knowledge"],
  "Digital Marketing & SEO": ["Technical SEO", "Growth Funnels", "GA4 Analytics", "Conversion Rate Optimization"]
};

const PostJobs = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    category: "Full Stack Development",
    complexity: "Intermediate",
    duration: "1-2 months",
    price: "2500",
    skills: "React, Node.js, Tailwind CSS",
    description: "",
    clientName: user?.name || "",
    clientCompany: "Enterprise Client",
    clientEmail: user?.email || "",
    termsAccepted: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleAddSkillChip = (skill) => {
    const currentSkills = formData.skills
      ? formData.skills.split(",").map(s => s.trim()).filter(Boolean)
      : [];
    if (!currentSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: currentSkills.length > 0 ? `${prev.skills}, ${skill}` : skill
      }));
    }
  };

  const validateStep = (step) => {
    setError("");
    if (step === 1) {
      if (!formData.title.trim() || formData.title.trim().length < 5) {
        setError("Please provide a descriptive project title (minimum 5 characters).");
        return false;
      }
      if (!formData.category) {
        setError("Please select an industry category.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.description.trim() || formData.description.trim().length < 20) {
        setError("Please provide project specifications and deliverables (minimum 20 characters).");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setError("");
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Please specify a valid escrow project budget.");
      return;
    }

    if (!formData.termsAccepted) {
      setError("Please accept the Freelanster Protected Escrow Terms.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim()).filter(Boolean);
      await jobsApi.create({
        title: formData.title.trim(),
        category: formData.category,
        price: String(formData.price),
        duration: formData.duration,
        skills: skillsArray,
        description: formData.description.trim(),
        clientName: formData.clientCompany || formData.clientName || user?.name || "Enterprise Client",
        clientEmail: formData.clientEmail || user?.email || ""
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/FindJobs");
      }, 2200);
    } catch (err) {
      console.error("Post job error:", err);
      setError(err.response?.data?.error || err.message || "Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSuggestions = categorySkillSuggestions[formData.category] || [];

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-1 w-full">
        {/* Header Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors mb-6 font-semibold"
        >
          <LuArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>

        {!isAuthenticated && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <LuShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Guest Mode:</strong> You are posting as a guest employer. Create an account or sign in to track applicant proposals and fund escrow directly.
              </span>
            </div>
            <Link
              to="/Login?redirect=/FindJobs/PostJobs"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap transition-colors shadow-xs"
            >
              Sign in first
            </Link>
          </div>
        )}

        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600">
                <LuPlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 font-sans">Post an Enterprise Mandate</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Reach verified global specialists across 14 industry sectors backed by protected escrow.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold">
              <LuShieldCheck className="w-4 h-4" />
              <span>100% Escrow Protected</span>
            </div>
          </div>

          {/* 3-Step Progress Indicators */}
          {!success && (
            <div className="my-8">
              <div className="flex items-center justify-between relative">
                {/* Background Connecting Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-0" />
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 -z-0"
                  style={{ width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" }}
                />

                {/* Step 1 Pill */}
                <div 
                  onClick={() => setCurrentStep(1)}
                  className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all ${
                    currentStep === 1 
                      ? "bg-teal-600 text-white shadow-md font-bold text-xs" 
                      : currentStep > 1 
                        ? "bg-teal-100 text-teal-800 text-xs font-bold" 
                        : "bg-slate-100 text-slate-500 text-xs font-semibold"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
                  <span>Scope & Sector</span>
                </div>

                {/* Step 2 Pill */}
                <div 
                  onClick={() => validateStep(1) && setCurrentStep(2)}
                  className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all ${
                    currentStep === 2 
                      ? "bg-teal-600 text-white shadow-md font-bold text-xs" 
                      : currentStep > 2 
                        ? "bg-teal-100 text-teal-800 text-xs font-bold" 
                        : "bg-slate-100 text-slate-500 text-xs font-semibold"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
                  <span>Milestones & Skills</span>
                </div>

                {/* Step 3 Pill */}
                <div 
                  onClick={() => validateStep(1) && validateStep(2) && setCurrentStep(3)}
                  className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all ${
                    currentStep === 3 
                      ? "bg-teal-600 text-white shadow-md font-bold text-xs" 
                      : "bg-slate-100 text-slate-500 text-xs font-semibold"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
                  <span>Escrow & Launch</span>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          {success ? (
            <div className="py-16 text-center space-y-4 animate-fade-in">
              <div className="w-20 h-20 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border-2 border-teal-200 shadow-lg">
                <LuCheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Enterprise Mandate Successfully Published!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your opportunity is now broadcast to verified specialists in the <strong>{formData.category}</strong> category.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mt-2">
                <LuSparkles className="w-4 h-4" />
                <span>Redirecting to Live Marketplace...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <LuShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: SCOPE & SECTOR */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Mandate Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Next.js 15 Full Stack Architect for SaaS Analytics Dashboard"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-xs"
                    />
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      Write a concise, professional title highlighting the primary skill or deliverable.
                    </p>
                  </div>

                  {/* Category Selector (All 14 Sectors) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Industry Sector / Category (14 Specialized Sectors) *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-xs"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Complexity & Duration Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Project Complexity
                      </label>
                      <select
                        name="complexity"
                        value={formData.complexity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                      >
                        <option value="Entry">Entry Level (Standard Deliverables)</option>
                        <option value="Intermediate">Intermediate (Established Specialist)</option>
                        <option value="Enterprise">Enterprise / High-Stakes Architecture</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Expected Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g. 2-4 weeks, 1-2 months"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm inline-flex items-center gap-2 transition-all shadow-sm"
                    >
                      <span>Continue to Milestones</span>
                      <LuArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: MILESTONES & SKILLS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Skills Tags */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Required Core Skills & Technologies *
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. React 19, TypeScript, Tailwind CSS, PostgreSQL"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-xs"
                    />

                    {/* Skill Suggestions Chips */}
                    {currentSuggestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 mr-1">Recommended for {formData.category}:</span>
                        {currentSuggestions.map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => handleAddSkillChip(sug)}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200/70 text-[11px] font-medium text-teal-800 transition-colors"
                          >
                            + {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Specifications & Deliverables *
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide comprehensive details: core objectives, expected deliverables, API integrations, architecture standards, and milestones..."
                      required
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  {/* Milestone Escrow Breakdown Preview */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <LuLayers className="w-4 h-4 text-teal-600" />
                      <span>Recommended 3-Stage Milestone Escrow Structure</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <span className="font-semibold text-slate-800">Stage 1: Architecture, Wireframes & Setup</span>
                        <span className="font-bold text-teal-600">30% Escrow</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <span className="font-semibold text-slate-800">Stage 2: Core Engineering & Functional MVP</span>
                        <span className="font-bold text-teal-600">40% Escrow</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <span className="font-semibold text-slate-800">Stage 3: QA Testing, Polishing & Handover</span>
                        <span className="font-bold text-teal-600">30% Escrow</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm inline-flex items-center gap-2 transition-colors"
                    >
                      <LuArrowLeft className="w-4 h-4" />
                      <span>Back to Scope</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm inline-flex items-center gap-2 transition-all shadow-sm"
                    >
                      <span>Continue to Escrow Budget</span>
                      <LuArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ESCROW BUDGET & CLIENT DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Budget & Fee Structure */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Total Escrow Project Budget ($ USD) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <LuDollarSign className="w-5 h-5 text-teal-600" />
                      </div>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="2500"
                        min="50"
                        required
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                    <div className="mt-2.5 p-3 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900 flex items-center justify-between">
                      <span>Funded into Escrow: <strong>${formData.price || 0} USD</strong></span>
                      <span className="font-semibold text-teal-700">0% Client Surcharge</span>
                    </div>
                  </div>

                  {/* Client & Company Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Company or Hiring Entity Name *
                      </label>
                      <input
                        type="text"
                        name="clientCompany"
                        value={formData.clientCompany}
                        onChange={handleChange}
                        placeholder="e.g. Nexus Ventures or John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Hiring Contact Email
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        placeholder="hiring@yourcompany.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Escrow Agreement Checkbox */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="termsAccepted" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      I agree to the <strong>Freelanster Milestone Escrow Terms</strong>. Funds will only be disbursed when deliverables meet the agreed specifications and are approved by you.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm inline-flex items-center gap-2 transition-colors"
                    >
                      <LuArrowLeft className="w-4 h-4" />
                      <span>Back to Milestones</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Publishing Mandate...</span>
                        </>
                      ) : (
                        <>
                          <LuCheckCircle2 className="w-4 h-4" />
                          <span>Publish & Broadcast Mandate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </main>

      <GoToTop />
      <Footer />
    </div>
  );
};

export default PostJobs;
