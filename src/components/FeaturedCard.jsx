



"use client";

import { Button, Chip } from "@heroui/react";
import { BookOpen, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ course, tutor }) => {
    // tutor অথবা course যেকোন প্রপ্স আসলেই ডাটা রিসিভ করবে
    const data = tutor || course;
    if (!data) return null;

    // MongoDB এবং Course schema উভয়টির ডাটা হ্যান্ডেল করার জন্য Fallback সেট করা হয়েছে
    const _id = data._id;
    const name = data.tutorName || data.title || "Untitled Tutor";
    const image = data.photoURL || data.thumbnail || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600";
    const category = data.subjectCategory || data.category || "General";
    const fee = data.hourlyFee ?? data.price ?? 0;
    const mode = data.teachingMode || "Online";
    const subText = data.institution || (data.instructor ? `By ${data.instructor}` : "");
    const locationText = data.location || "";

    return (
        <div className="w-full flex-1 grow group flex flex-col bg-[#16181d] rounded-3xl border border-[#22252e] hover:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1">
            {/* Image Container */}
            <div className="w-full relative overflow-hidden aspect-[16/10] bg-[#1f222a]">
                <Image
                    alt={name}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Teaching Mode / Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <Chip
                        variant="flat"
                        className="font-bold bg-[#1f222a]/90 text-pink-400 border border-[#2a2d36] backdrop-blur-md px-3 py-1 text-xs"
                    >
                        {mode}
                    </Chip>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col grow space-y-4 w-full">
                <div className="space-y-1">
                    <span className="text-xs font-bold tracking-widest text-pink-500 uppercase">
                        {category}
                    </span>
                    <Link href={`/tutors/${_id || ""}`}>
                        <h3 className="text-xl font-bold leading-tight line-clamp-1 text-white hover:text-pink-400 transition-colors duration-200">
                            {name}
                        </h3>
                    </Link>
                </div>

                {/* Info Badges */}
                <div className="space-y-1.5 text-xs text-gray-400 font-medium">
                    {subText && (
                        <p className="flex items-center gap-2 text-gray-300">
                            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                            <span className="truncate">{subText}</span>
                        </p>
                    )}
                    {locationText && (
                        <p className="flex items-center gap-2 text-gray-400">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            <span className="truncate">{locationText}</span>
                        </p>
                    )}
                </div>

                {/* Bottom Price & Action Button */}
                <div className="pt-4 mt-auto border-t border-[#22252e] flex justify-between items-center w-full">
                    <div>
                        <span className="text-xs text-gray-400 block">Hourly Fee</span>
                        <span className="text-xl font-black text-white">
                            ৳{fee}<span className="text-xs text-gray-400 font-normal">/hr</span>
                        </span>
                    </div>

                    <Link href={`/tutors/${_id || ""}`}>
                        <Button
                            variant="flat"
                            className="font-bold rounded-xl px-4 py-2 bg-[#1f222a] border border-[#2a2d36] text-gray-300 hover:text-white hover:border-pink-500 transition-all duration-200 text-sm"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TutorCard;
