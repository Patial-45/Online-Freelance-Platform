import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoToTop from "./GoToTop";
import { 
  LuShieldCheck, 
  LuFileText, 
  LuScale, 
  LuLock, 
  LuArrowLeft, 
  LuCheckCircle2, 
  LuLayers, 
  LuMapPin,
  LuMail
} from "react-icons/lu";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-1 w-full">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors mb-6 font-semibold"
        >
          <LuArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header Title */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 shadow-2xs">
                <LuFileText className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Legal & Operational Protocol</span>
                <h1 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">Terms & Conditions</h1>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold">
              <span>Last Revised: September 2026</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mt-6">
            Welcome to <strong>VectraWork</strong>. These Terms & Conditions govern your access to and use of the VectraWork marketplace, API endpoints, milestone escrow protocol, and related services. By accessing or utilizing the platform, you agree to be bound by these Terms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <LuShieldCheck className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-slate-800">100% Escrow Vault</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Approval-based disbursements</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <LuScale className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-slate-800">Fair Mediation</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Objective code & deliverable audit</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <LuMapPin className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-slate-800">Solan, HP, India</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Governing legal jurisdiction</p>
            </div>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-10 text-sm leading-relaxed text-slate-700">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">1</span>
              <span>Platform Role & Eligibility</span>
            </h2>
            <p>
              VectraWork operates as a specialized online marketplace connecting independent verified specialists ("Freelancers" / "Specialists") and commercial clients ("Clients" / "Employers"). All members must be at least 18 years of age and possess the legal capacity to enter into binding agreements.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">2</span>
              <span>Account Security & Verification</span>
            </h2>
            <p>
              Users are responsible for maintaining the confidentiality of account credentials and JWT authorization tokens. Platform accounts are non-transferable. VectraWork reserves the right to request identity or portfolio authentication to maintain marketplace integrity.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">3</span>
              <span>Smart Milestone Escrow Protocol</span>
            </h2>
            <p>
              To ensure zero counterparty risk, VectraWork utilizes a transparent 3-stage Milestone Escrow protocol:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <p><strong>• Fund Deposit:</strong> Clients fund milestone budgets prior to project kickoff into the protected escrow vault.</p>
              <p><strong>• Verification Period:</strong> Clients have up to 7 business days to inspect deliverables against agreed project specifications.</p>
              <p><strong>• Final Release:</strong> Funds are disbursed to the specialist only upon explicit client approval or verified milestone acceptance.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">4</span>
              <span>Intellectual Property & Work Product Rights</span>
            </h2>
            <p>
              Unless explicitly modified in writing between Client and Freelancer, full intellectual property rights, source code, design files, trademarks, and associated deliverables automatically transfer to the Client upon full milestone escrow disbursement.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">5</span>
              <span>Fair Dispute Resolution & Code Audit</span>
            </h2>
            <p>
              In the rare event of a project dispute regarding deliverables or specifications, either party may request neutral arbitration through the VectraWork Technical Mediation Board. Our audit team inspects Git commits, deliverables, and communication logs to render an impartial ruling.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">6</span>
              <span>Governing Law & Legal Jurisdiction</span>
            </h2>
            <p>
              These Terms and any contractual relationship established through the platform shall be governed by and construed in accordance with the laws of <strong>Solan, Himachal Pradesh, India</strong>, without regard to conflict of law principles.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Legal Contact & Inquiries</h2>
            <p className="text-xs text-slate-500">
              For legal inquiries, intellectual property notices, or compliance questions, please contact our legal desk:
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-teal-700 pt-1">
              <LuMail className="w-4 h-4 text-teal-600" />
              <a href="mailto:support@vectrawork.com" className="hover:underline">
                support@vectrawork.com
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Solan, Himachal Pradesh, India</span>
            </div>
          </section>
        </div>
      </main>

      <GoToTop />
      <Footer />
    </div>
  );
};

export default Terms;
