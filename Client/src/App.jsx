import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomeCarousel from "./Components/HomeCarousel";
import GlassFeature from "./Components/GlassFeature";
import CateCards from "./Components/CateCards";
import SpecialtySection from "./Components/SpecialtySection";
import Cards from "./Components/Cards";
import About from "./Components/About";
import GoToTop from "./Components/GoToTop";
import Footer from "./Components/Footer";
import { jobsApi } from "./services/api";
import { LuArrowRight, LuBriefcase } from "react-icons/lu";
import { LuSparkles } from "./Components/Icons";

const fallbackHomeJobs = [
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
    _id: "mandate-1",
    title: "Brand Identity, 3D Icon Set & Marketing Collateral",
    category: "Graphic Design",
    price: "1800",
    duration: "2-3 weeks",
    date: "Today",
    description: "Seeking a brand designer to craft our 2026 visual identity, design 25+ customized 3D vector icons in Blender/Illustrator, and create responsive social & marketing collateral.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/graphic_design.png?updatedAt=1682608753579",
    skills: ["Branding", "3D Icons", "Illustrator", "Figma"],
    clientName: "Aura Creative Studio"
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
  }
];

const App = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const glassRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await jobsApi.getAll();
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setFeaturedJobs(res.data.data.slice(0, 6));
        } else {
          setFeaturedJobs(fallbackHomeJobs);
        }
      } catch (err) {
        setFeaturedJobs(fallbackHomeJobs);
      }
    };
    fetchFeatured();
  }, []);

  const handleScrollToFeatures = () => {
    glassRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      {/* Dynamic Navbar with Top Scroll Progress */}
      <Navbar onAboutClick={handleScrollToAbout} />

      {/* 1. Hero Swiper Parallax Carousel with Typewriter & Bouncing Indicator */}
      <HomeCarousel onScrollDown={handleScrollToFeatures} />

      {/* 2. "Why to choose Freelanster?" Glass Section with Wave SVGs */}
      <div ref={glassRef}>
        <GlassFeature />
      </div>

      {/* 3. Job Categories Swiper Coverflow 3D Slider */}
      <CateCards />

      {/* 4. Freelansters Specialty Section with Features.png and 11 Floating Shapes */}
      <SpecialtySection />

      {/* 5. Verified Active Opportunities (Crisp Light Cards) */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                <LuBriefcase className="w-3.5 h-3.5" />
                <span>Verified Listings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-sans">
                Featured Opportunities
              </h2>
              <p className="mt-2 text-slate-600 text-base max-w-xl">
                High-budget projects backed by funded milestone escrow and transparent deliverables.
              </p>
            </div>

            <Link
              to="/FindJobs"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors group"
            >
              <span>Explore All Jobs</span>
              <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Cards key={job._id || job.id} curElem={job} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. "Our Team" About Section */}
      <div ref={aboutRef}>
        <About />
      </div>

      {/* 7. Floating Scroll-to-Top Button */}
      <GoToTop />

      {/* 8. Production Footer */}
      <Footer />
    </div>
  );
};

export default App;
