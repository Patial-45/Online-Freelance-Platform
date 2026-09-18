import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Cards from "./Components/Cards";
import GoToTop from "./Components/GoToTop";
import Footer from "./Components/Footer";
import { jobsApi } from "./services/api";
import { LuSearch, LuBriefcase } from "react-icons/lu";

const categories = [
  "All",
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

const fallbackInitialJobs = [
  {
    _id: "mandate-1",
    title: "Brand Identity, 3D Icon Set & Marketing Collateral",
    category: "Graphic Design",
    price: "1800",
    duration: "2-3 weeks",
    date: "Today",
    description: "Seeking a brand designer to craft our 2026 visual identity, design 25+ customized 3D vector icons in Blender/Illustrator, and create responsive social & marketing collateral for an AI developer platform.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/graphic_design.png?updatedAt=1682608753579",
    skills: ["Branding", "3D Icons", "Illustrator", "Figma"],
    clientName: "Aura Creative Studio"
  },
  {
    _id: "mandate-2",
    title: "In-Depth Technical Documentation & API Architecture Guides",
    category: "Article Writing",
    price: "1400",
    duration: "3-4 weeks",
    date: "Yesterday",
    description: "Author comprehensive, interactive API reference guides, architectural case studies, and migration tutorials for our cloud infrastructure SDK.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/article_writing.png?updatedAt=1682608757184",
    skills: ["Technical Writing", "API Docs", "Markdown", "Developer Relations"],
    clientName: "DevDocs Labs"
  },
  {
    _id: "mandate-3",
    title: "Cinematic Product Launch Video & Dynamic Motion Graphics",
    category: "Video Editing",
    price: "2200",
    duration: "2 weeks",
    date: "2 days ago",
    description: "Produce a high-energy 90-second product launch video featuring 3D animated device mockups, kinetic typography, sound design, and color grading for a new fintech mobile app.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/video_editing.png?updatedAt=1682610666961",
    skills: ["After Effects", "Premiere Pro", "Motion Design", "Sound Design"],
    clientName: "Pulse Media"
  },
  {
    _id: "mandate-4",
    title: "SaaS Financial Modeling, Tax Filing & Escrow Audit",
    category: "Accountant",
    price: "2600",
    duration: "1 month",
    date: "3 days ago",
    description: "Prepare institutional financial models, GAAP compliant P&L forecasts, cash burn projections, and milestone escrow reconciliations for our Series A funding round.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/accountant.jpg?updatedAt=1682608757258",
    skills: ["Financial Modeling", "GAAP Accounting", "Tax Strategy", "QuickBooks"],
    clientName: "Metric Advisors"
  },
  {
    _id: "mandate-5",
    title: "Enterprise Android Tablet App with Offline SQLite & Biometric Auth",
    category: "Android Developer",
    price: "3800",
    duration: "1-2 months",
    date: "3 days ago",
    description: "Build an enterprise Android warehouse inventory tablet application using Kotlin and Jetpack Compose with background SQLite replication, QR/barcode scanning, and biometric lock.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/android_developer.png?updatedAt=1682608757160",
    skills: ["Kotlin", "Jetpack Compose", "Room DB", "CameraX"],
    clientName: "OmniFlow Systems"
  },
  {
    _id: "mandate-6",
    title: "Global Product Catalog Standardization & CRM Data Migration",
    category: "Data Entry",
    price: "1100",
    duration: "2 weeks",
    date: "4 days ago",
    description: "Clean, deduplicate, and catalog over 15,000 SKU product specifications into HubSpot and Shopify with accurate metadata tagging and SEO descriptions.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/data_entry.png?updatedAt=1682608753900",
    skills: ["Data Verification", "HubSpot", "Shopify", "Excel/Sheets"],
    clientName: "Global Retail Depot"
  },
  {
    _id: "mandate-7",
    title: "Last-Mile Delivery Route Optimization & Dispatch Analytics",
    category: "Logistics",
    price: "3200",
    duration: "1-2 months",
    date: "4 days ago",
    description: "Implement vehicle routing algorithms and freight cost calculation pipelines to minimize transit delays and optimize regional distribution hub scheduling.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/logistics.jpg?updatedAt=1682610667062",
    skills: ["Logistics Strategy", "Routing Algorithms", "Data Analysis", "Supply Chain"],
    clientName: "Vanguard Freight"
  },
  {
    _id: "mandate-8",
    title: "Fine-Tuned LLM Autonomous Agent for Customer Support",
    category: "AI & Machine Learning",
    price: "5500",
    duration: "2 months",
    date: "5 days ago",
    description: "Develop a domain-adapted RAG agent using LangChain, pgvector, and Claude 3.5 / OpenAI APIs with streaming response webhooks and human-in-the-loop escalation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    skills: ["Python", "LangChain", "Vector DB", "OpenAI / Claude API"],
    clientName: "Nexus AI Ventures"
  },
  {
    _id: "mandate-9",
    title: "Modern Next.js 15 & Node.js Scalable Platform Architecture",
    category: "Full Stack Development",
    price: "4500",
    duration: "1-2 months",
    date: "Today",
    description: "Architect high-performance SSR web platform with Next.js 15 App Router, Tailwind CSS, Prisma ORM, and automated CI/CD deployment on Vercel and AWS.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    skills: ["Next.js 15", "React 19", "Node.js", "TypeScript", "Tailwind CSS"],
    clientName: "Aura Systems"
  },
  {
    _id: "mandate-10",
    title: "Mobile FinTech Design System & Interactive Figma Component Library",
    category: "UI/UX & Product Design",
    price: "3400",
    duration: "1 month",
    date: "Yesterday",
    description: "Design accessible, responsive design tokens, payment flows, wallet dashboards, and micro-interactions in Figma adhering to iOS Human Interface and Material 3 standards.",
    image: "https://images.unsplash.com/photo-1581291518655-9523c93269e2?auto=format&fit=crop&w=600&q=80",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    clientName: "FinPulse Labs"
  },
  {
    _id: "mandate-11",
    title: "Multi-Region Kubernetes Cluster & Infrastructure as Code",
    category: "Cloud & DevOps",
    price: "4800",
    duration: "3 weeks",
    date: "2 days ago",
    description: "Deploy Terraform configurations, AWS EKS clusters across 2 regions, ArgoCD GitOps pipelines, and Datadog monitoring for sub-50ms latency global traffic.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    skills: ["AWS", "Kubernetes", "Terraform", "Docker", "GitOps"],
    clientName: "CloudScale Global"
  },
  {
    _id: "mandate-12",
    title: "Telehealth Video Consultation & Patient Records Mobile App",
    category: "Mobile Apps (iOS & Flutter)",
    price: "4200",
    duration: "2 months",
    date: "3 days ago",
    description: "Develop a HIPAA-compliant cross-platform mobile app in Flutter with WebRTC video calling, appointment booking, digital prescriptions, and push notifications.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    skills: ["Flutter", "Dart", "WebRTC", "Firebase", "iOS/Android"],
    clientName: "HealthCare Pulse"
  },
  {
    _id: "mandate-13",
    title: "Smart Contract Security Audit & Penetration Testing",
    category: "Cybersecurity & Auditing",
    price: "6000",
    duration: "2-3 weeks",
    date: "4 days ago",
    description: "Conduct formal mathematical verification, reentrancy analysis, and gas optimization for Solidity DeFi smart contracts and web3 authorization endpoints.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    skills: ["Solidity", "Smart Contract Audit", "Slither", "Penetration Testing"],
    clientName: "Sentinel Security"
  },
  {
    _id: "mandate-14",
    title: "High-ROI Growth Funnel & Technical SEO Architecture",
    category: "Digital Marketing & SEO",
    price: "2000",
    duration: "1 month",
    date: "5 days ago",
    description: "Restructure site schema markup, core web vitals, keyword clustering, and multi-channel acquisition funnels to accelerate organic client onboarding.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    skills: ["Technical SEO", "Growth Strategy", "Google Analytics 4", "Conversion Funnels"],
    clientName: "GrowthSpurt Media"
  }
];

const FindJobs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [isLoading, setIsLoading] = useState(true);

  // Sync category if URL search changes
  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category");
    const q = new URLSearchParams(location.search).get("search");
    if (cat) setSelectedCategory(cat);
    if (q) setSearchQuery(q);
  }, [location.search]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await jobsApi.getAll();
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setJobs(res.data.data);
          setFilteredJobs(res.data.data);
        } else {
          setJobs(fallbackInitialJobs);
          setFilteredJobs(fallbackInitialJobs);
        }
      } catch (err) {
        console.warn("Using verified fallback list:", err.message);
        setJobs(fallbackInitialJobs);
        setFilteredJobs(fallbackInitialJobs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = jobs;

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (job) => job.category && job.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          (job.title && job.title.toLowerCase().includes(q)) ||
          (job.description && job.description.toLowerCase().includes(q)) ||
          (Array.isArray(job.skills) && job.skills.some((s) => s.toLowerCase().includes(q)))
      );
    }

    if (maxBudget < 10000) {
      result = result.filter((job) => {
        const p = Number(String(job.price).replace(/[^0-9]/g, "")) || 0;
        return p <= maxBudget;
      });
    }

    setFilteredJobs(result);
  }, [selectedCategory, searchQuery, maxBudget, jobs]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <Hero
        title="Find Jobs"
        desc="The Best Place where you can find jobs and verified high-budget opportunities."
        placeholder="Search jobs by title, skills or keyword..."
        img="https://images.unsplash.com/photo-1498354178607-a79df2916198?auto=format&fit=crop&w=1920&q=80"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Filter Controls Bar */}
        <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 mb-10 space-y-5 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LuSearch className="w-4 h-4 text-teal-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter current results..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Budget Slider */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Max Budget:</span>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-32 sm:w-44 accent-teal-600 cursor-pointer"
              />
              <span className="text-xs font-bold text-teal-700 min-w-[70px]">
                {maxBudget >= 10000 ? "Any Budget" : `$${maxBudget}`}
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/80">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredJobs.length}</strong> active opportunities
            </span>
            {(selectedCategory !== "All" || searchQuery || maxBudget < 10000) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setMaxBudget(10000);
                }}
                className="text-teal-600 hover:text-teal-700 font-bold hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Fetching verified opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 text-center text-slate-500 p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <LuBriefcase className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No jobs matched your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting filters or expanding your budget range.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Cards key={job._id || job.id} curElem={job} />
            ))}
          </div>
        )}
      </main>

      <GoToTop />
      <Footer />
    </div>
  );
};

export default FindJobs;
