import React from "react";
import { Link } from "react-router-dom";
import { LuMapPin, LuPhone, LuMail, LuHeart } from "react-icons/lu";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b1320] text-slate-300 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: VectraWork Brand Title & Contact Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-teal-400 font-sans tracking-tight">
              VectraWork
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-sans">
              The precision freelance platform connecting clients with extraordinary engineering & creative talent worldwide.
            </p>
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <LuMapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Solan, Himachal Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3">
                <LuPhone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+919136281166" className="hover:text-teal-400 transition-colors">
                  +91 9136281166
                </a>
              </div>
              <div className="flex items-center gap-3">
                <LuMail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:support@vectrawork.com" className="hover:text-teal-400 transition-colors">
                  support@vectrawork.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Explore Navigation */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-sans">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/FindJobs" className="hover:text-teal-400 transition-colors">
                  Browse Verified Jobs
                </Link>
              </li>
              <li>
                <Link to="/FindFreelancer" className="hover:text-teal-400 transition-colors">
                  Find Top Freelancers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link to="/FindJobs/PostJobs" className="hover:text-teal-400 transition-colors">
                  Post a Job Listing
                </Link>
              </li>
              <li>
                <Link to="/Terms" className="hover:text-teal-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-sans">
              Categories
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/FindJobs?category=Graphic%20Design" className="hover:text-teal-400 transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/FindJobs?category=Android%20Developer" className="hover:text-teal-400 transition-colors">
                  Android Development
                </Link>
              </li>
              <li>
                <Link to="/FindJobs?category=Video%20Editing" className="hover:text-teal-400 transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link to="/FindJobs?category=Article%20Writing" className="hover:text-teal-400 transition-colors">
                  Article Writing
                </Link>
              </li>
              <li>
                <Link to="/FindJobs?category=Accountant" className="hover:text-teal-400 transition-colors">
                  Accountant & Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Security & Social */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-sans">
              Connect With Us
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay updated with new job postings, featured talent spotlights, and platform releases.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/Patial-45"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:border-teal-400 transition-colors text-base"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sahil-patial-45/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-teal-400 hover:border-teal-400 transition-colors text-base"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/sahil_patial45/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-400 transition-colors text-base"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Live on Vercel 2026
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <p>
              Copyright &copy; www.VectraWork.com. All rights reserved!
            </p>
            <Link to="/Terms" className="text-slate-400 hover:text-teal-400 transition-colors underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with</span>
            <LuHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by Sahil Patial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
