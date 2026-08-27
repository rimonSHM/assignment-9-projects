


import EnrollmentButton from "@/components/EnrollmentButton";
import { auth } from "@/lib/auth";
import { Chip } from "@heroui/react";

import {
    BookOpen,
    Clock,
    Users,
    MapPin,
    Building,
    Briefcase,
    Calendar,
    GraduationCap,
} from "lucide-react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

const fetchSingleCourse = async (id, token) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            console.error("Tutor API error:", res.status);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Fetch tutor error:", error);
        return null;
    }
};

export default async function CourseDetails({ params }) {
    const { id } = await params;
    const requestHeaders = await headers();

    // Check Login
    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session?.user) {
        redirect(
            `/auth/signin?callbackUrl=${encodeURIComponent(
                `/tutors/${id}`
            )}`
        );
    }

    // Get JWT
    const { token } = await auth.api.getToken({
        headers: requestHeaders,
    });

    if (!token) {
        redirect(
            `/auth/signin?callbackUrl=${encodeURIComponent(
                `/tutors/${id}`
            )}`
        );
    }

    // Fetch Tutor
    const tutor = await fetchSingleCourse(id, token);

    if (!tutor) {
        return (
            <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-red-500">
                        Tutor not found
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Please check the tutor ID or try again later.
                    </p>
                </div>
            </div>
        );
    }

    const {
        tutorName,
        photoURL,
        subjectCategory,
        availableDaysAndTime,
        hourlyFee,
        totalSlot,
        institution,
        experience,
        location,
        teachingMode,
    } = tutor;

    const featuredItems = [
        {
            icon: GraduationCap,
            label: subjectCategory || "General",
        },
        {
            icon: Calendar,
            label: availableDaysAndTime || "Flexible",
        },
        {
            icon: MapPin,
            label: location || "Remote",
        },
        {
            icon: Users,
            label: `${totalSlot || 0} Slots Available`,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0f1115] text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Image */}
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-[#22252e]">
                            <Image
                                src={
                                    photoURL ||
                                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                                }
                                alt={tutorName || "Tutor Profile"}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-6 left-6">
                                <Chip
                                    variant="flat"
                                    className="bg-[#1f222a]/90 text-[#fbc7d4] border border-[#22252e] font-bold"
                                >
                                    {teachingMode || "Offline"} Mode
                                </Chip>
                            </div>
                        </div>

                        {/* Title & Info */}
                        <div className="space-y-4">
                            <span className="text-[#fbc7d4] font-semibold text-sm uppercase tracking-wider">
                                {subjectCategory} Tutor
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black">
                                {tutorName}
                            </h1>
                            <div className="flex items-center gap-3 text-gray-400 text-lg">
                                <Building className="w-5 h-5 text-[#fbc7d4]" />
                                <span>{institution || "Institution not specified"}</span>
                            </div>
                        </div>

                        {/* Features Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#22252e]">
                            {featuredItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center justify-center p-4 bg-[#16181d] rounded-2xl border border-[#22252e] text-center gap-2"
                                    >
                                        <Icon className="w-6 h-6 text-[#fbc7d4]" />
                                        <span className="text-xs text-gray-300 font-medium truncate w-full">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Experience & Bio Section */}
                        <div className="bg-[#16181d] p-6 md:p-8 rounded-3xl border border-[#22252e] space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-[#fbc7d4]">
                                <Briefcase className="w-5 h-5" />
                                Experience & Qualifications
                            </h3>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {experience || "No experience details provided."}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div>
                        <div className="sticky top-24 bg-[#16181d] p-8 rounded-[2rem] border border-[#22252e] space-y-8">

                            {/* Price */}
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                                    Hourly Rate
                                </p>
                                <div className="mt-1 flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-[#fbc7d4]">
                                        ৳{hourlyFee}
                                    </span>
                                    <span className="text-gray-400 text-sm">/ hour</span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-4 border-t border-b border-[#22252e] py-6 text-sm">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span className="text-gray-400">Total Slots:</span>
                                    <span className="font-semibold text-white">{totalSlot || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span className="text-gray-400">Teaching Mode:</span>
                                    <span className="font-semibold text-white">{teachingMode}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span className="text-gray-400">Location:</span>
                                    <span className="font-semibold text-white">{location}</span>
                                </div>
                            </div>

                            {/* Enrollment Button Component */}
                            <EnrollmentButton tutors={tutor} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}