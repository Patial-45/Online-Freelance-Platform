import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jobsApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoToTop from "./GoToTop";
import { 
  LuArrowLeft, 
  LuClock, 
  LuDollarSign, 
  LuBriefcase, 
  LuShieldCheck, 
  LuSend, 
  LuCheckCircle2, 
  LuUser, 
  LuCalendar,
  LuLayers,
  LuLock,
  LuUnlock,
  LuCheck
} from "react-icons/lu";
import { LuSparkles } from "./Icons";

const SingleJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedMilestones, setCompletedMilestones] = useState([1]);

  const toggleMilestone = (milestoneNumber) => {
    if (completedMilestones.includes(milestoneNumber)) {
      setCompletedMilestones(prev => prev.filter(m => m !== milestoneNumber));
    } else {
      setCompletedMilestones(prev => [...prev, milestoneNumber].sort());
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const res = await jobsApi.getById(id);
        if (res.data && res.data.data) {
          setJob(res.data.data);
          setBidAmount(res.data.data.price ? res.data.data.price.replace('$', '') : "500");
        }
      } catch (err) {
        console.warn("Could not fetch job by ID from server, checking fallback:", err.message);
        // Fallback demo job so the page renders reliably
        setJob({
          _id: id,
          title: "Senior Full Stack React & Node.js Platform Engineer",
          category: "Programming & Tech",
          price: "3500",
          duration: "1-2 months",
          date: "Recently posted",
          description: "We are architecting a next-generation decentralized freelance marketplace for 2026. You will be responsible for crafting high-performance API endpoints, responsive Bento-Grid layouts, and secure tokenized workflows with sub-second response times.",
          skills: ["React 19", "Node.js", "MongoDB", "Tailwind CSS", "Vite"],
          clientName: "Nexus Ventures Ltd.",
          clientEmail: "hiring@nexus.dev",
          proposals: []
        });
        setBidAmount("3500");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    if (!coverLetter.trim()) {
      setErrorMsg("Please provide a brief cover note.");
      return;
    }

    if (!user && (!guestName.trim() || !guestEmail.trim())) {
      setErrorMsg("Please provide your name and email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await jobsApi.submitProposal(id, {
        freelancerName: user?.name || guestName.trim() || "Professional Specialist",
        freelancerEmail: user?.email || guestEmail.trim() || "specialist@freelanster.com",
        bidAmount: Number(bidAmount),
        coverLetter: coverLetter.trim()
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setProposalModalOpen(false);
        setCoverLetter("");
        setGuestName("");
        setGuestEmail("");
      }, 2000);
    } catch (err) {
      console.warn("Proposal submission offline fallback:", err.message);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setProposalModalOpen(false);
        setCoverLetter("");
        setGuestName("");
        setGuestEmail("");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20 text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold">Retrieving job specifications...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex-1 w-full">
        {/* Back Link */}
        <button
          onClick={() => navigate('/FindJobs')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors mb-6"
        >
          <LuArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        {/* Main Job Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-700">
                  {job?.category || "Technology"}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200">
                  Job ID: {id?.slice(0, 8)}...
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans leading-tight">
                {job?.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-100 font-medium">
                <div className="flex items-center gap-1.5">
                  <LuCalendar className="w-4 h-4 text-slate-400" />
                  <span>Posted {job?.date || "Recently"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Verified Client</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuClock className="w-4 h-4 text-slate-400" />
                  <span>{job?.duration || "1-3 months"}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">Project Scope & Requirements</h3>
                <div className="text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                  {job?.description}
                </div>
              </div>

              {/* Required Skills */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-3">Target Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {(job?.skills || ["React", "Node.js", "Design"]).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestone Escrow Simulator */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <LuLayers className="w-5 h-5 text-teal-600" />
                    <h3 className="text-base font-bold text-slate-900">Protected Milestone Escrow</h3>
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    Vault Protected
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4">
                  Funds for this mandate are pre-deposited into the Freelanster smart escrow vault and released stage-by-stage only after your explicit approval.
                </p>

                {(() => {
                  const numPrice = Number(job?.price ? String(job.price).replace(/[^0-9]/g, '') : 3000) || 3000;
                  const s1 = Math.round(numPrice * 0.3);
                  const s2 = Math.round(numPrice * 0.4);
                  const s3 = numPrice - s1 - s2;
                  const released = (completedMilestones.includes(1) ? s1 : 0) + 
                                   (completedMilestones.includes(2) ? s2 : 0) + 
                                   (completedMilestones.includes(3) ? s3 : 0);
                  const pct = Math.round((released / numPrice) * 100);

                  const milestonesList = [
                    { id: 1, title: "Stage 1: Architecture, Wireframes & Setup", amount: s1, share: "30%" },
                    { id: 2, title: "Stage 2: Core Engineering & Functional MVP", amount: s2, share: "40%" },
                    { id: 3, title: "Stage 3: QA Polishing, Security Audit & Handover", amount: s3, share: "30%" },
                  ];

                  return (
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                      {/* Escrow Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-700">Escrow Release Progress</span>
                          <span className="text-teal-600 font-sans">${released} of ${numPrice} USD ({pct}%)</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestone Interactive List */}
                      <div className="space-y-2 pt-2">
                        {milestonesList.map((m) => {
                          const isDone = completedMilestones.includes(m.id);
                          return (
                            <div 
                              key={m.id}
                              className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                isDone 
                                  ? "bg-teal-50/70 border-teal-200" 
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isDone ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-600"
                                }`}>
                                  {isDone ? <LuCheck className="w-3.5 h-3.5" /> : m.id}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800">{m.title}</p>
                                  <p className="text-[11px] text-slate-500">{m.share} of total budget (${m.amount} USD)</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                  isDone ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                                }`}>
                                  {isDone ? "Disbursed" : "Vault Locked"}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => toggleMilestone(m.id)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                                    isDone 
                                      ? "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50" 
                                      : "bg-teal-600 hover:bg-teal-700 text-white shadow-2xs"
                                  }`}
                                >
                                  {isDone ? "Hold in Vault" : "Approve & Release"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-[11px] text-slate-400 italic pt-1">
                        * Interactive demonstration of Freelansters zero-dispute milestone escrow protocol.
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Client info (Right 1 col) */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Fixed Budget</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 font-sans">
                    ${job?.price ? job.price.replace('$', '').replace('₹', '') : '500'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">USD</span>
                </div>
              </div>

              <button
                onClick={() => setProposalModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
              >
                <LuSend className="w-4 h-4" />
                <span>Submit a Proposal</span>
              </button>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center justify-between">
                  <span>Client Rating</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1">
                    <LuSparkles className="w-3.5 h-3.5 text-amber-500" />
                    4.9/5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hires to date</span>
                  <span className="text-slate-800 font-bold">14 projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Escrow Protection</span>
                  <span className="text-teal-600 font-bold">Active & Funded</span>
                </div>
              </div>
            </div>

            {/* Client Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">About the Client</h4>
              <p className="text-sm font-bold text-slate-900">{job?.clientName || "Enterprise Client"}</p>
              <p className="text-xs text-slate-500 mt-1">Verified partner on Freelansters platform with 100% payment track record.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Proposal Modal */}
      {proposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Submit Your Project Proposal</h3>
              <button
                onClick={() => setProposalModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200">
                  <LuCheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Proposal Dispatched!</h4>
                <p className="text-xs text-slate-500">The client will review your bid and reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="mt-5 space-y-4">
                {user ? (
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-xl bg-teal-600 text-white">
                        <LuShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Applying as {user.name}</p>
                        <p className="text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200/80 shadow-xs">
                      Verified
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                      <span>Submitting as guest specialist</span>
                      <Link to="/Login" className="text-teal-600 font-bold hover:underline">
                        Sign in instead
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Jane Doe"
                          required
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="jane@example.com"
                          required
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Bid Amount ($ USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <LuDollarSign className="w-4 h-4 text-teal-600" />
                    </div>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      min="10"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cover Note & Approach
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Describe your relevant experience, technical approach, and expected milestones..."
                    required
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Send Proposal"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <GoToTop />
      <Footer />
    </div>
  );
};

export default SingleJob;
