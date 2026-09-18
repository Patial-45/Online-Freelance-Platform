import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import { LuChevronLeft, LuChevronRight, LuArrowRight, LuBriefcase } from "react-icons/lu";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  {
    id: 1,
    title: "Graphic Design",
    description: "Brand identities, vector illustrations, UI concepts, and marketing assets crafted by design masters.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/graphic_design.png?updatedAt=1682608753579",
    mandates: "12 Open Mandates",
  },
  {
    id: 2,
    title: "Article Writing",
    description: "High-impact editorial copy, technical documentation, research papers, and SEO-optimized storytelling.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/article_writing.png?updatedAt=1682608757184",
    mandates: "9 Open Mandates",
  },
  {
    id: 3,
    title: "Video Editing",
    description: "Cinematic post-production, motion graphics, audio mastering, and engaging digital video clips.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/video_editing.png?updatedAt=1682610666961",
    mandates: "14 Open Mandates",
  },
  {
    id: 4,
    title: "Accountant",
    description: "Financial modeling, tax compliance, corporate bookkeeping, and milestone budget auditing.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/accountant.jpg?updatedAt=1682608757258",
    mandates: "6 Open Mandates",
  },
  {
    id: 5,
    title: "Android Developer",
    description: "Modern Kotlin, Jetpack Compose, and cross-platform mobile apps built with fluid 60fps performance.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/android_developer.png?updatedAt=1682608757160",
    mandates: "11 Open Mandates",
  },
  {
    id: 6,
    title: "Data Entry",
    description: "Fastidious database cataloging, spreadsheet validation, data extraction, and CRM maintenance.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/data_entry.png?updatedAt=1682608753900",
    mandates: "15 Open Mandates",
  },
  {
    id: 7,
    title: "Logistics",
    description: "Global supply chain planning, freight route optimization, inventory auditing, and fulfillment.",
    image: "https://ik.imagekit.io/bhanu1776/Freelansters/logistics.jpg?updatedAt=1682610667062",
    mandates: "8 Open Mandates",
  },
  {
    id: 8,
    title: "AI & Machine Learning",
    description: "Fine-tuned LLMs, autonomous agents, RAG architectures, and computer vision models.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    mandates: "18 Open Mandates",
  },
  {
    id: 9,
    title: "Full Stack Development",
    description: "High-throughput React, Next.js, Node.js, and cloud backends engineered for scale.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    mandates: "22 Open Mandates",
  },
  {
    id: 10,
    title: "UI/UX & Product Design",
    description: "Figma design systems, user journeys, accessible components, and interactive prototypes.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    mandates: "16 Open Mandates",
  },
  {
    id: 11,
    title: "Cloud & DevOps",
    description: "AWS, Kubernetes clusters, Dockerized microservices, and automated CI/CD pipelines.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    mandates: "10 Open Mandates",
  },
  {
    id: 12,
    title: "Mobile Apps (iOS & Flutter)",
    description: "Native Swift and multiplatform Flutter apps with offline sync and clean architectures.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    mandates: "13 Open Mandates",
  },
  {
    id: 13,
    title: "Cybersecurity & Auditing",
    description: "Vulnerability assessments, penetration testing, compliance certification, and smart contract audits.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    mandates: "7 Open Mandates",
  },
  {
    id: 14,
    title: "Digital Marketing & SEO",
    description: "Organic search ranking, paid advertising funnels, conversion optimization, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    mandates: "11 Open Mandates",
  },
];

const CateCards = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    if (onSelectCategory) {
      onSelectCategory(title);
    }
    navigate(`/FindJobs?category=${encodeURIComponent(title)}`);
  };

  return (
    <section className="py-20 bg-[#ffffff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Deployed Version */}
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-sans tracking-tight">
            Job Categories
          </h2>
          {/* Authentic Signature Turquoise Accent Line */}
          <div className="w-24 h-1 bg-[#1cd6ce] rounded-full mx-auto" />
        </div>

        {/* 3D Swiper Coverflow Slider Matching Deployed Version */}
        <div className="relative py-6">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            speed={750}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: ".catecards-prev",
              nextEl: ".catecards-next",
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="catecards-slider"
            style={{ width: "100%", minHeight: "520px" }}
          >
            {categories.map((cat) => (
              <SwiperSlide
                key={cat.id}
                className="catecards-slide"
                style={{
                  width: "320px",
                  height: "440px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                }}
              >
                <div
                  onClick={() => handleCardClick(cat.title)}
                  className="catecards-card cursor-pointer group"
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    width: "320px",
                    height: "440px",
                  }}
                >
                  {/* Slide Content Box (Reveals smoothly on hover & active slide) */}
                  <div className="catecards-content">
                    <h3 className="catecards-title font-sans">
                      {cat.title}
                    </h3>
                    <p className="catecards-body font-sans line-clamp-2">
                      {cat.description}
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(cat.title);
                        }}
                        className="catecards-btn font-sans"
                      >
                        <span>Learn More</span>
                        <LuArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls Matching Deployed Circular Buttons */}
          <div className="flex items-center justify-center gap-6 mt-3">
            <button
              className="catecards-prev w-10 h-10 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-lg flex items-center justify-center text-slate-900 hover:text-[#00c8aa] transition-all hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Category"
            >
              <LuChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              className="catecards-next w-10 h-10 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-lg flex items-center justify-center text-slate-900 hover:text-[#00c8aa] transition-all hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Category"
            >
              <LuChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateCards;
