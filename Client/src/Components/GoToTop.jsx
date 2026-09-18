import React, { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    setIsVisible(winScroll > 120);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={goToBtn}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Scroll to top"
      title="Scroll to Top"
    >
      <LuArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
    </button>
  );
};

export default GoToTop;
