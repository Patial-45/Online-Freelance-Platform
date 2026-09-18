import React from "react";
import { LuStar, LuClock, LuShieldCheck, LuMapPin, LuMessageSquare, LuCalendar } from "react-icons/lu";

const ProfileCards = ({ freelancer, onBook, onMessage }) => {
  const f = freelancer || {};
  const {
    _id,
    name = "Elena Rostova",
    title = "Senior Product Designer",
    special = "UI/UX & Design Systems",
    price = 85,
    time = "Available 30h/wk",
    img = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    stars = 5.0,
    reviews = 42,
    skills = ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    location = "Remote / Worldwide",
    description = "Senior specialist dedicated to delivering scalable, high-impact results with obsessive attention to craft."
  } = f;

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 shadow-xs">
      <div>
        {/* Header: Avatar, Name & Rating */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={img}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 group-hover:border-teal-500 transition-colors shadow-sm"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
              }}
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 p-1 bg-teal-600 rounded-full text-white shadow-xs" title="Verified Specialist">
              <LuShieldCheck className="w-3 h-3" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate font-sans">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <LuStar className="w-3 h-3 fill-amber-500" />
                <span>{Number(stars).toFixed(1)}</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-teal-700 truncate mt-0.5">{special || title}</p>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 font-medium">
              <LuMapPin className="w-3 h-3 text-slate-400" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700 border border-slate-200/70"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-slate-50 text-[11px] text-slate-500 border border-slate-200/60">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Details & CTAs */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">Rate: </span>
            <span className="text-sm font-bold text-slate-900">${price}/hr</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <LuClock className="w-3.5 h-3.5 text-teal-600" />
            <span>{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onBook && onBook(f)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <LuCalendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Book Consultation</span>
          </button>

          <button
            onClick={() => onMessage && onMessage(f)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title="Message Specialist"
          >
            <LuMessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
