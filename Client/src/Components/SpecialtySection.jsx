import React from "react";
import { LuCheckCircle2, LuShieldCheck, LuUsers, LuHelpCircle } from "react-icons/lu";

const features = [
  {
    title: "Post a Job",
    icon: LuCheckCircle2,
    description: "A job posting is defined as an official advertisement created by the employer or recruiter to alert skilled seekers regarding an opening with clear scope and milestones."
  },
  {
    title: "Choose Freelancers",
    icon: LuUsers,
    description: "No job is too big or too small. We've got freelancers for jobs of any size or budget with extraordinary skills. No job is complex — we can get it done!"
  },
  {
    title: "Pay Securely",
    icon: LuShieldCheck,
    description: "Only pay for work when it has been completed and you're 100% satisfied with the quality using our protected milestone payment escrow system."
  },
  {
    title: "We're here to help",
    icon: LuHelpCircle,
    description: "Our dedicated support team helps you identify the best freelancer for the job, with technical co-pilots ready to ensure seamless execution."
  }
];

const SpecialtySection = () => {
  return (
    <section className="py-24 bg-[#f8fafc] border-y border-slate-200/80 relative overflow-hidden">
      {/* 11 Floating Decorative Background Elements (Smooth GPU Physics, Contained) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/1.png?updatedAt=1682608761055"
          alt=""
          className="absolute top-10 left-[4%] w-10 sm:w-14 animate-float-slow opacity-60"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/2.png?updatedAt=1682608761012"
          alt=""
          className="absolute top-24 left-[40%] w-12 sm:w-16 animate-float-bounce opacity-50"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/3.png?updatedAt=1682608761027"
          alt=""
          className="absolute top-48 left-[24%] w-8 sm:w-12 animate-float-slow opacity-60"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/4.png?updatedAt=1682608760997"
          alt=""
          className="absolute top-1/2 left-[2%] w-12 sm:w-16 animate-float-bounce opacity-45"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/5.png?updatedAt=1682608761058"
          alt=""
          className="absolute bottom-20 left-[28%] w-10 sm:w-14 animate-float-slow opacity-60"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/6.png?updatedAt=1682608761020"
          alt=""
          className="absolute top-16 right-[35%] w-10 sm:w-12 animate-float-bounce opacity-55"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/7.png?updatedAt=1682608759198"
          alt=""
          className="absolute bottom-1/3 left-[42%] w-10 sm:w-14 animate-float-slow opacity-60"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/8.png?updatedAt=1682608757447"
          alt=""
          className="absolute bottom-16 right-[24%] w-12 sm:w-16 animate-float-bounce opacity-50"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/9.png?updatedAt=1682608757207"
          alt=""
          className="absolute top-20 right-[10%] w-12 sm:w-14 animate-float-slow opacity-60"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/10.png?updatedAt=1682608757182"
          alt=""
          className="absolute top-1/3 right-[5%] w-10 sm:w-12 animate-float-bounce opacity-50"
        />
        <img
          src="https://ik.imagekit.io/bhanu1776/Freelansters/11.png?updatedAt=1682608757190"
          alt=""
          className="absolute bottom-8 right-[5%] w-12 sm:w-16 animate-float-slow opacity-60"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-sans tracking-tight">
            Freelansters Specialty
          </h2>
          {/* Turquoise Divider */}
          <div className="w-28 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto pt-1 font-medium">
            A frictionless ecosystem designed to make collaboration secure, high-yield, and reliable.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Features Graphic */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative max-w-md sm:max-w-lg w-full">
              <img
                src="https://ik.imagekit.io/bhanu1776/Freelansters/Features.png?updatedAt=1682608753683"
                alt="Freelansters Specialty Workflow"
                className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: 4 Milestone Points */}
          <div className="lg:col-span-6 space-y-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-teal-500/40 hover:shadow-md transition-all duration-300 flex gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtySection;
