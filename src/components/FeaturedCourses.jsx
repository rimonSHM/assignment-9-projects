


import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import FeaturedCard from "./FeaturedCard";
import { fetchFeaturedCourses } from "@/lib/courses/data";



const FeaturedCourses = async () => {
    const courses = await fetchFeaturedCourses();
    // console.log(courses);

    return (
        // ১. এখানে bg-slate-50 কেটে দেওয়া হয়েছে এবং text-white যোগ করা হয়েছে
        <section className="px-[20px] py-24 relative w-full overflow-hidden rounded-3xl bg-[#16181d] border border-[#22252e] min-h-[520px] lg:min-h-[480px] flex items-center text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        {/* ২. text-blue-600 থেকে পরিবর্তন করে রোজ পিঙ্ক (#fbc7d4) করা হয়েছে */}
                        <h2 className="text-[#fbc7d4] font-bold uppercase tracking-widest text-sm">Top Rated</h2>
                        {/* ৩. text-slate-900 থেকে পরিবর্তন করে text-white করা হয়েছে */}
                        <h3 className="text-4xl font-extrabold text-white">Featured Tutors</h3>
                        {/* ৪. text-slate-500 থেকে পরিবর্তন করে text-gray-400 করা হয়েছে */}
                        <p className="text-gray-400 max-w-xl">
                            Handpicked premium courses designed to help you master the most in-demand skills in the industry today.
                        </p>
                    </div>
                    <Button
                        variant="flat"
                        // ৫. color="primary" বাদ দিয়ে কাস্টম ডার্ক থিম কালার ও বর্ডার যুক্ত করা হয়েছে
                        className="rounded-full font-bold group bg-[#1f222a] border border-[#2a2d36] text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-200 px-6 py-5"
                    >
                        View All Courses <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        courses?.map(course => <FeaturedCard key={course?._id} course={course} />)
                    }

                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;












