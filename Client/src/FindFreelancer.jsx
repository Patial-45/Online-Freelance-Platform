import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import FFlancer from "./Components/FFlancer";
import GoToTop from "./Components/GoToTop";
import Footer from "./Components/Footer";

const FindFreelancer = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      <Navbar />

      <Hero
        title="Find Freelancers"
        desc="Choose a perfect Freelancer with extraordinary skill for jobs of any size or budget."
        placeholder="Search specialists by skill, stack, or title..."
        img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
      />

      <main className="flex-1 w-full">
        <FFlancer />
      </main>

      <GoToTop />
      <Footer />
    </div>
  );
};

export default FindFreelancer;