import React from "react";
import { Link } from "react-router-dom";
import { 
  LuArrowRight, 
  LuShieldCheck, 
  LuCheckCircle2, 
  LuClock, 
  LuLock, 
  LuCheck
} from "react-icons/lu";

const GlassFeature = () => {
  return (
    <section className="relative py-20 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Wave SVG */}
      <div className="w-full overflow-hidden leading-none -mb-1 opacity-70">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-16"
        >
          <path
            d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#0d9488"
            fillOpacity="0.08"
          />
        </svg>
      </div>

      {/* Main Frosted Glass Container */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-50/90 via-teal-50/30 to-emerald-50/40 backdrop-blur-xl border border-slate-200/90 p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: 2026 Typography and Core Value Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <LuShieldCheck className="w-4 h-4 text-teal-600" />
                <span>VectraWork Protocol</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight leading-[1.15]">
                Why choose VectraWork?
              </h2>
              {/* Turquoise Accent Bar */}
              <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" />
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Engineered for high-trust commercial collaboration. We eliminate middleman surcharges, automate milestone escrow security, and connect enterprise projects directly with verified top-tier specialists.
            </p>

            {/* 3 Core Value Bullet Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-sans">0% Specialist Platform Fee</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Freelancers keep 100% of agreed contract earnings with zero deductions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-sans">Automated 3-Stage Milestone Escrow</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Funds are pre-locked in vault and released strictly upon verified deliverable approval.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-sans">Top 3% Pre-Vetted Specialists</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Rigorous GitHub, architecture, and code-quality verified credentials.</p>
                </div>
              </div>
            </div>

            {/* CTA Button Matching New Refined Deep Teal Palette */}
            <div className="pt-3">
              <Link
                to="/FindJobs"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-sm shadow-md shadow-teal-800/20 transition-all hover:scale-105 active:scale-95 group font-sans"
              >
                <span>Explore Verified Mandates</span>
                <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2026 Interactive Milestone Escrow & Platform Hub Card */}
          <div className="lg:col-span-6 relative">
            {/* Top Floating Badge */}
            <div className="absolute -top-4 -left-3 z-30 bg-white/95 backdrop-blur-md border border-teal-200/90 px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold text-teal-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>Smart Escrow Vault v2.6</span>
            </div>

            {/* Main Interactive Terminal / Hub Card */}
            <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden group hover:border-teal-500/40 transition-colors">
              {/* Ambient Glow Aura */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header with Vault Total */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Contract Escrow Vault</span>
                  <span className="text-2xl font-black text-white font-sans mt-0.5 block">$14,500.00 <span className="text-xs text-teal-400 font-normal">USD</span></span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  100% Protected
                </span>
              </div>

              {/* 3-Stage Milestone Stepper */}
              <div className="space-y-4 py-6">
                {/* Stage 1: Verified */}
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                      <LuCheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white font-sans">Stage 1: Architecture & API Specs</h5>
                      <span className="text-[11px] text-emerald-400 font-semibold">Disbursed ($3,500 USD)</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase">Complete</span>
                </div>

                {/* Stage 2: Active */}
                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-teal-500/40 flex items-center justify-between gap-3 shadow-md shadow-teal-500/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0 animate-pulse">
                      <LuClock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white font-sans">Stage 2: Core Engineering MVP</h5>
                      <span className="text-[11px] text-teal-300 font-semibold">Under Client Review ($5,500 USD)</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-teal-500/20 text-[10px] font-bold text-teal-300 uppercase">In Review</span>
                </div>

                {/* Stage 3: Vault Lock */}
                <div className="p-3.5 rounded-2xl bg-slate-800/30 border border-slate-800 flex items-center justify-between gap-3 opacity-70">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700/50 border border-slate-600/50 text-slate-400 flex items-center justify-center shrink-0">
                      <LuLock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-300 font-sans">Stage 3: Security Audit & Handover</h5>
                      <span className="text-[11px] text-slate-400 font-semibold">Held in Vault ($5,500 USD)</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-bold text-slate-400 uppercase">Locked</span>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-800/40">
                  <span className="text-xs font-black text-teal-400 block font-mono">0%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Specialist Fee</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/40">
                  <span className="text-xs font-black text-teal-400 block font-mono">100%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Escrow Cover</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/40">
                  <span className="text-xs font-black text-teal-400 block font-mono">&lt; 24h</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Fast Payouts</span>
                </div>
              </div>
            </div>

            {/* Bottom Right Floating Badge */}
            <div className="absolute -bottom-4 -right-2 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700 px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Solan, HP • Global Multi-Currency</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave SVG */}
      <div className="w-full overflow-hidden leading-none -mt-1 opacity-70 rotate-180">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-16"
        >
          <path
            d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#0d9488"
            fillOpacity="0.08"
          />
        </svg>
      </div>
    </section>
  );
};

export default GlassFeature;
