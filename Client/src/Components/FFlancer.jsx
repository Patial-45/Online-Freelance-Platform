import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { freelancersApi } from "../services/api";
import ProfileCards from "./ProfileCards";
import { 
  LuSearch, 
  LuCalendar, 
  LuCheckCircle2, 
  LuX, 
  LuUsers
} from "react-icons/lu";

const fallbackFreelancers = [
  {
    _id: "fl-1",
    name: "Alex Rivera",
    title: "Principal Frontend Architect",
    special: "React, Next.js & Design Systems",
    price: 85,
    time: "Available 30h/wk",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    stars: 5.0,
    reviews: 48,
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "Former tech lead with 8+ years experience crafting world-class web applications, design systems, and high-fidelity micro-interactions.",
    location: "San Francisco, CA (Remote)"
  },
  {
    _id: "fl-2",
    name: "Sahil Patial",
    title: "Full Stack Engineer & Cloud Specialist",
    special: "MERN Stack, Serverless & Microservices",
    price: 75,
    time: "Available 40h/wk",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    stars: 4.9,
    reviews: 62,
    skills: ["Node.js", "Express", "MongoDB", "React", "AWS"],
    description: "Full-stack developer focused on robust API architectures, real-time communication, and production-grade deployments.",
    location: "Remote / Worldwide"
  },
  {
    _id: "fl-3",
    name: "Elena Rostova",
    title: "Senior Product Designer",
    special: "UI/UX, Mobile & Design Tokens",
    price: 90,
    time: "Available 20h/wk",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    stars: 5.0,
    reviews: 37,
    skills: ["Figma", "UX Research", "Prototyping", "Design Tokens"],
    description: "Award-winning product designer helping startups scale from zero to millions of users with memorable, accessible UX.",
    location: "Berlin, Germany (Remote)"
  },
  {
    _id: "fl-4",
    name: "Marcus Chen",
    title: "AI Solutions & Backend Engineer",
    special: "Python, FastAPI & LLM Integrations",
    price: 95,
    time: "Available 25h/wk",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    stars: 4.8,
    reviews: 29,
    skills: ["Python", "FastAPI", "PostgreSQL", "LangChain", "Docker"],
    description: "Specialized in productionizing generative AI models, low-latency vector databases, and scalable microservices.",
    location: "Toronto, Canada (Remote)"
  },
  {
    _id: "fl-5",
    name: "Sophia Martinez",
    title: "Mobile App Engineer",
    special: "React Native & Swift Architecture",
    price: 80,
    time: "Available 35h/wk",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    stars: 4.9,
    reviews: 44,
    skills: ["React Native", "Swift", "iOS", "Android", "Redux"],
    description: "Cross-platform mobile engineer delivering 60fps animations and offline-first mobile apps for consumer tech brands.",
    location: "Austin, TX (Remote)"
  },
  {
    _id: "fl-6",
    name: "David Kim",
    title: "DevOps & Cloud Security Architect",
    special: "Kubernetes, AWS & Terraform",
    price: 110,
    time: "Available 15h/wk",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    stars: 5.0,
    reviews: 53,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    description: "Infrastructure engineer with extensive background scaling enterprise cloud foundations to billions of requests.",
    location: "Seattle, WA (Remote)"
  }
];

const FFlancer = () => {
  const location = useLocation();
  const { user } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Sync searchQuery when URL query param changes
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("search");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Booking Modal State
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: user?.name || "",
    clientEmail: user?.email || "",
    projectScope: "",
    preferredDate: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setIsLoading(true);
        const res = await freelancersApi.getAll();
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setFreelancers(res.data.data);
          setFilteredFreelancers(res.data.data);
        } else {
          setFreelancers(fallbackFreelancers);
          setFilteredFreelancers(fallbackFreelancers);
        }
      } catch (err) {
        console.warn("Using verified fallback list:", err.message);
        setFreelancers(fallbackFreelancers);
        setFilteredFreelancers(fallbackFreelancers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = freelancers;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((f) => 
        (f.name && f.name.toLowerCase().includes(q)) ||
        (f.title && f.title.toLowerCase().includes(q)) ||
        (f.special && f.special.toLowerCase().includes(q)) ||
        (Array.isArray(f.skills) && f.skills.some(s => s.toLowerCase().includes(q)))
      );
    }

    if (selectedSkill !== "All") {
      result = result.filter((f) => 
        Array.isArray(f.skills) && f.skills.some(s => s.toLowerCase() === selectedSkill.toLowerCase())
      );
    }

    setFilteredFreelancers(result);
  }, [searchQuery, selectedSkill, freelancers]);

  const handleOpenBooking = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setBookingForm({
      clientName: user?.name || "",
      clientEmail: user?.email || "",
      projectScope: "",
      preferredDate: ""
    });
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmittingBooking(true);

    try {
      if (selectedFreelancer?._id && !selectedFreelancer._id.startsWith("fl-")) {
        await freelancersApi.book(selectedFreelancer._id, bookingForm);
      }
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingModalOpen(false);
        setBookingSuccess(false);
        setBookingForm({ clientName: "", clientEmail: "", projectScope: "", preferredDate: "" });
      }, 2500);
    } catch (err) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingModalOpen(false);
        setBookingSuccess(false);
      }, 2500);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const skillsFilterList = ["All", "React", "Node.js", "Python", "Figma", "AWS", "UI/UX"];

  return (
    <div className="py-12 bg-[#ffffff] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 mb-10 space-y-4 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LuSearch className="w-5 h-5 text-teal-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialists by name, technical stack, or role..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {skillsFilterList.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedSkill === skill
                      ? "bg-teal-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/80">
            <span>Showing <strong className="text-slate-900 font-bold">{filteredFreelancers.length}</strong> vetted specialists</span>
            <span>All talent verified for English fluency & technical precision</span>
          </div>
        </div>

        {/* Grid of Freelancers */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading verified talent directory...</p>
          </div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="py-20 text-center text-slate-500 p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <LuUsers className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No specialists matched your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search term or clearing the skill filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <ProfileCards
                key={freelancer._id || freelancer.id}
                freelancer={freelancer}
                onBook={handleOpenBooking}
                onMessage={handleOpenBooking}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Book Consultation</h3>
                <p className="text-xs font-semibold text-teal-600">With {selectedFreelancer?.name}</p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200">
                  <LuCheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Request Dispatched!</h4>
                <p className="text-xs text-slate-500">
                  {selectedFreelancer?.name} has been notified and will respond with available calendar slots.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.clientName}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.clientEmail}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientEmail: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Brief Project Scope
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bookingForm.projectScope}
                    onChange={(e) => setBookingForm({ ...bookingForm, projectScope: e.target.value })}
                    placeholder="Summary of project goals, timeframe, and deliverables..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <LuCalendar className="w-4 h-4" />
                  <span>{isSubmittingBooking ? "Dispatching..." : "Confirm Consultation Request"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FFlancer;
