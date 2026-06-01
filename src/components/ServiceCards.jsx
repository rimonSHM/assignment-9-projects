

"use client";
import { Folder, Share2, ShieldCheck } from "lucide-react";
import React from "react";

export default function ServiceCards() {
  const cardsData = [
    {
      icon: <Folder size={20} className="text-[#fbc7d4]" />,
      title: "Open source",
      description: "Status is a community project. Anyone can build, contribute to and fork its source code.",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Share2 size={20} className="text-[#3a6073]" />,
      title: "Decentralised",
      description: "Communities are exclusively powered by their members running the Status desktop app.",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <ShieldCheck size={20} className="text-[#cbb4d4]" />,
      title: "Secure",
      description: "Self-custodial keys safeguard your wallets and messages via elliptic curve cryptography.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      
      {/* --- কার্ডের উপরের নতুন টেক্সট সেকশন (Section Header) --- */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Awesome Features
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed">
          Replenish man have thing gathering lights yielding shall you. Discover the power of structural and secure ecosystem.
        </p>
      </div>

      {/* 3 Columns Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-[#16181d] border border-[#22252e] hover:border-gray-700 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 group hover:-translate-y-1"
          >
            
            {/* Image Section */}
            <div className="relative h-44 w-full overflow-hidden bg-[#1f222a] border-b border-[#22252e]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#16181d] via-transparent to-transparent z-10 opacity-60" />
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-[#1f222a] border border-[#2a2d36] flex items-center justify-center shadow-md">
                  {card.icon}
                </div>

                {/* Text Group */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#fbc7d4] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  ); 
}