


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function BannerSlider() {
  
  const slides = [
    {
      tag: "Expert Mentorship",
      title: "Master New Skills with Elite 1-on-1 Tutors",
      description:
        "Connect with verified global educators tailored completely to your schedule. Break down complex math, science, or coding concepts effortlessly.",
      gradient: "from-[#fbc7d4] via-[#cbb4d4] to-[#3a6073]",
      image: "https://static.vecteezy.com/system/resources/previews/006/518/952/large_2x/down-shot-of-hajee-mohammad-danesh-science-and-technology-university-dinajpur-bangladesh-january-21-2021-free-photo.jpg"
    },
    {
      tag: "Tech & Engineering",
      title: "Accelerate Your Software & Web3 Goals",
      description:
        "From modern frontend frameworks like Next.js to advanced cloud infrastructure, learn production-grade workflows straight from industry veterans.",
      gradient: "from-[#11998e] to-[#38ef7d]",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
    },
    {
      tag: "Flexible Scheduling",
      title: "Structured Learning Built Around Your Pace",
      description:
        "Book customized structural hours, view transparent peer evaluations, and track your milestone achievements smoothly in real time.",
      gradient: "from-[#8e2de2] to-[#4a00e0]",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-[#16181d] border border-[#22252e] min-h-[520px] lg:min-h-[480px] flex items-center">

      {/* Slider Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full flex-shrink-0 relative px-6 sm:px-8 md:px-16 py-12 lg:py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-4"
          >
            {/* Gradient Glow Background */}
            <div
              className={`absolute right-[-10%] top-[-15%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-br ${slide.gradient} opacity-15 sm:opacity-20 blur-[80px] sm:blur-[120px] pointer-events-none`}
            />

            {/* Text Content */}
            <div className="max-w-xl md:max-w-2xl z-10 space-y-4 sm:space-y-6 order-1 lg:order-1">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-[#fbc7d4] uppercase bg-[#1f222a] border border-[#2a2d36] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full">
                  <Sparkles size={12} />
                  {slide.tag}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                {slide.title}
              </h2>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="pt-2">
                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fbc7d4] to-[#cbb4d4] text-black px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold hover:scale-[1.02] transition-all duration-200 shadow-xl group"
                >
                  Find a Tutor
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Responsive Dynamic Image Container */}
            <div className="w-full lg:w-[350px] h-[220px] sm:h-[260px] lg:h-[300px] shrink-0 relative lg:mr-8 z-10 order-2 lg:order-2">
              <div 
                className="w-full h-full max-w-[320px] lg:max-w-none mx-auto rounded-3xl bg-cover bg-center bg-no-repeat border-4 border-[#2a2d36] shadow-2xl transition-all duration-500 hover:rotate-0"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  transform: idx % 2 === 0 ? 'rotate(3deg)' : 'rotate(-3deg)'
                }}
              />
            </div>

          </div>
        ))}
      </div>

      {/* Prev Button (hidden on extra small screens for cleaner layout) */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-xl bg-[#111318]/70 border border-[#2a2d36] text-gray-400 hover:text-white hover:bg-[#111318] transition-all z-20"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-xl bg-[#111318]/70 border border-[#2a2d36] text-gray-400 hover:text-white hover:bg-[#111318] transition-all z-20"
      >
        <ChevronRight size={20} />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? "w-6 sm:w-8 bg-white"
                : "w-1.5 sm:w-2 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}