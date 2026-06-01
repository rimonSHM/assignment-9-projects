"use client";

import React from "react";
import { BookOpen, Globe, ShieldCheck } from "lucide-react";

export default function TextCard() {
    

  const features = [
    {
      icon: <BookOpen size={20} className="text-[#fbc7d4]" />,
      title: "Scholarship Facility",
      description: "Access premium fully or partially funded scholarship structures built specifically to support high-achieving global students."
    },
    {
      icon: <Globe size={20} className="text-[#3a6073]" />,
      title: "Global Certification",
      description: "Earn validated milestones and structural course certificates recognized globally by industry-leading software teams."
    },
    {
      icon: <ShieldCheck size={20} className="text-[#cbb4d4]" />,
      title: "Secure Verification",
      description: "Interact with strictly vetted, trusted educators through end-to-end authenticated security models for peace of mind."
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
    Get Started In 3 Steps
  </h2>
  <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed">
    Start using premium digital tools in minutes, not hours.
  </p>
</div>
      {/* Grid Layout: মোবাইলে ১টি, ট্যাবে ২টি, ল্যাপটপে ৩টি পাশাপাশি বসবে */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#16181d] border border-[#22252e] hover:border-gray-700 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 group"
          >
            <div className="space-y-4">
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-[#1f222a] border border-[#2a2d36] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>

              {/* Text Layout */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

         
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}