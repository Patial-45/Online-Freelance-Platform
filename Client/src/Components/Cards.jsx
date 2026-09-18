import React from "react";
import { Link } from "react-router-dom";
import { LuClock, LuDollarSign, LuArrowRight } from "react-icons/lu";

// Curated high-res category covers replacing the dead source.unsplash.com
const fallbackImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
];

const Cards = (props) => {
  const job = props.curElem || props;
  const { _id, title, category, date, duration, description, price, image, skills, clientName } = job;

  // Safe image selection
  const safeImage = (image && !image.includes("source.unsplash.com")) 
    ? image 
    : fallbackImages[Math.abs((title || "").length) % fallbackImages.length];

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 overflow-hidden shadow-xs">
      {/* Card Header Media */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={safeImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = fallbackImages[0];
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-xs font-bold text-teal-700 shadow-xs">
            {category || "Programming"}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-xs font-bold text-white flex items-center gap-0.5 shadow-xs">
            <LuDollarSign className="w-3.5 h-3.5 text-teal-400" />
            {price ? price.replace("$", "").replace("₹", "") : "Fixed"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>{clientName || "Verified Listing"}</span>
            <div className="flex items-center gap-1 text-slate-400">
              <LuClock className="w-3.5 h-3.5 text-teal-600" />
              <span>{date || "Recent"}</span>
            </div>
          </div>

          <Link to={`/FindJobs/${_id}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 font-sans">
              {title}
            </h3>
          </Link>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Skills pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 3) : ["React", "Full Stack"]).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700 border border-slate-200/70"
              >
                {skill}
              </span>
            ))}
            {duration && (
              <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-[11px] font-bold text-teal-700 border border-teal-200/60">
                {duration}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Verified Escrow</span>
          <Link
            to={`/FindJobs/${_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            <span>View Details</span>
            <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
