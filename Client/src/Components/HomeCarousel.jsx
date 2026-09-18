import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAuth } from "../context/AuthContext";

const HomeCarousel = ({ onScrollDown }) => {
  const { user, isAuthenticated } = useAuth();
  const username = user?.name || "Guest";

  return (
    <div className="relative w-full pt-20 md:pt-24 pb-6 px-3 sm:px-6 lg:px-10 max-w-[1440px] mx-auto">
      {/* Carousel Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          parallax={true}
          speed={1000}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Parallax, Autoplay, Pagination, Navigation]}
          className="hero-swiper"
        >
          {/* Slide 1: Welcome & Overview */}
          <SwiperSlide>
            <div
              slot="container-start"
              className="parallax-bg"
              data-swiper-parallax="-25%"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85"
                alt="Welcome to VectraWork"
                loading="eager"
              />
            </div>
            <div
              className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-4"
              data-swiper-parallax="-300"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-widest">
                Discover Elite Engineering & Design
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-serif tracking-tight drop-shadow-lg">
                VectraWork Platform
              </h1>
              <p className="text-base sm:text-xl text-teal-100/90 max-w-2xl mx-auto font-sans font-medium drop-shadow">
                The precision marketplace to get extraordinary work built with verified specialist talent.
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 2: Typewriter Tagline */}
          <SwiperSlide>
            <div
              slot="container-start"
              className="parallax-bg"
              data-swiper-parallax="-25%"
            >
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=85"
                alt="Find Desired Opportunities"
                loading="lazy"
              />
            </div>
            <div
              className="relative z-10 text-left px-8 md:px-16 max-w-4xl mr-auto space-y-3"
              data-swiper-parallax="-300"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-serif tracking-tight drop-shadow-md">
                Welcome, {isAuthenticated ? username : "Specialist"}
              </h1>
              <div className="pt-2">
                <h2 className="typewriter-text text-xl sm:text-3xl md:text-4xl font-serif text-teal-300 font-semibold drop-shadow">
                  Where extraordinary work gets built
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3: Find Jobs */}
          <SwiperSlide>
            <div
              slot="container-start"
              className="parallax-bg"
              data-swiper-parallax="-25%"
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=85"
                alt="Find Verified Mandates"
                loading="lazy"
              />
            </div>
            <div
              className="relative z-10 text-center px-6 max-w-3xl mx-auto space-y-4"
              data-swiper-parallax="-300"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-amber-200 font-secular tracking-wide drop-shadow-lg leading-tight">
                Find High-Impact <br /> Mandates Here
              </h1>
              <p className="text-sm sm:text-lg text-slate-100 max-w-xl mx-auto font-medium">
                Verified high-budget openings with guaranteed milestone payouts and zero delays.
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 4: Choose Perfect Freelancer */}
          <SwiperSlide>
            <div
              slot="container-start"
              className="parallax-bg"
              data-swiper-parallax="-25%"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=85"
                alt="Hire Elite Specialists"
                loading="lazy"
              />
            </div>
            <div
              className="relative z-10 text-right px-8 md:px-16 max-w-3xl ml-auto space-y-4"
              data-swiper-parallax="-300"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-orange-200 font-serif tracking-tight drop-shadow-lg leading-tight">
                Hire Elite Specialists <br /> On-Demand
              </h1>
              <p className="text-sm sm:text-lg text-slate-100 max-w-md ml-auto font-medium">
                Direct hiring with pre-vetted engineers, UI/UX designers, and technical architects.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Signature Bouncing Scroll Down Indicator */}
      <div 
        onClick={onScrollDown}
        className="mt-6 flex flex-col items-center justify-center cursor-pointer group select-none transition-transform hover:scale-110"
        title="Scroll to explore features"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 group-hover:text-teal-700 transition-colors">
          Explore Platform
        </span>
        <div className="scroll-indicator space-y-1">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
