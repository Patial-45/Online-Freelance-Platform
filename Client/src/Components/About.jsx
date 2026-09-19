import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { LuShieldCheck } from "react-icons/lu";
import sahilPatialImg from "../Img/sahil_patial.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#ffffff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Deployed Version */}
        <div className="text-center space-y-2 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-sans tracking-tight">
            Our Team
          </h2>
          {/* Turquoise Accent Divider */}
          <div className="w-20 h-1 bg-[#1cd6ce] rounded-full mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto pt-2 font-medium">
            Architecting and scaling the modern VectraWork platform ecosystem.
          </p>
        </div>

        {/* Solitary Main Spotlight Card for Sahil Patial */}
        <div className="max-w-md mx-auto">
          <div className="group relative rounded-3xl bg-[#f8fafc] border border-slate-200/90 hover:border-teal-400/60 shadow-md hover:shadow-2xl transition-all duration-500 pt-12 pb-10 px-8 text-center overflow-hidden">
            {/* Top Founder Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[11px] font-bold text-teal-700 shadow-2xs">
                <LuShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Founder & Lead</span>
              </span>
            </div>

            {/* Circular Avatar with Interactive Hover Aura Scale */}
            <div className="relative mx-auto w-40 h-40 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/30 to-cyan-400/30 scale-125 group-hover:scale-150 transition-transform duration-700 -z-0 blur-xs" />
              <img
                src={sahilPatialImg}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/sahil_patial.jpg";
                }}
                alt="Sahil Patial - Software Engineer & Founder"
                className="relative z-10 w-full h-full rounded-full object-cover object-[center_18%] border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:border-teal-200"
                loading="lazy"
              />
            </div>

            {/* Member Info */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                Sahil Patial
              </h3>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mt-1">
                Software Engineer
              </span>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-medium max-w-sm mx-auto">
                Architecting scalable cloud architectures, high-performance web systems, and intelligent freelance marketplace workflows.
              </p>
            </div>

            {/* Core Competencies Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 pb-6">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-[11px] font-bold text-slate-700 shadow-2xs">
                Full Stack
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-[11px] font-bold text-slate-700 shadow-2xs">
                System Design
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-[11px] font-bold text-slate-700 shadow-2xs">
                Cloud Architecture
              </span>
            </div>

            {/* Signature Sliding Bottom Social Drawer */}
            <div className="absolute bottom-0 left-0 right-0 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-6 text-white shadow-lg z-20">
              <a
                href="https://github.com/Patial-45"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-950 transition-colors p-1.5 text-lg"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sahil-patial-45/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-950 transition-colors p-1.5 text-lg"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/sahil_patial45/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-950 transition-colors p-1.5 text-lg"
                aria-label="Instagram"
                title="Instagram Profile"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
