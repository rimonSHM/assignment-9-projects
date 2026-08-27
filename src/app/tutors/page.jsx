


import React from 'react';
import CoursesHeader from "@/components/CoursesHeader";
import { BookOpen } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { fetchCourses } from '@/lib/courses/data';

const TutorsPage = async ({ searchParams }) => {
    const sParams = await searchParams;

    const searchTerm = sParams?.searchTerm || "";
    const startDate = sParams?.startDate || "";
    const endDate = sParams?.endDate || "";

    // backend/data fetcher এ ফিল্টার প্যারামিটার পাঠানো হচ্ছে
    const courses = await fetchCourses({ searchTerm, startDate, endDate });

    return (
        <div className="min-h-screen bg-[#0f1115] text-white">
            {/* Header উইথ SearchBar */}
            <CoursesHeader />

            <main className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
                
                {/* Section Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 tracking-tight">
                        <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-[#fbc7d4]' />
                        <span>All Tutors</span>
                    </h2>
                </div>  

                {/* Tutor Grid */}
                {courses && courses.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {courses.map((item) => (
                            <CourseCard key={item._id} course={item} />
                        ))} 
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        No tutors found. Try adjusting your search or date filters.
                    </div>
                )}
                
            </main>
        </div>
    );
};

export default TutorsPage;