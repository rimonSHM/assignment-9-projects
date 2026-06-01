


// "use client";

import React from 'react';
import CoursesHeader from "@/components/CoursesHeader";
import { BookOpen, Filter } from 'lucide-react';
import { Button } from '@heroui/react';
import CourseCard from '@/components/CourseCard';
import { fetchCourses } from '@/lib/courses/data';



// const fetchCourses = async()=> {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
//     const data = res.json();
//     return data || [];
// }



const TutorsPage = async () => {

        const courses = await fetchCourses();

          

    return (
        <div className="min-h-screen bg-[#11131891] text-white">
         
            <CoursesHeader />

            <main className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
              
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 tracking-tight">
                        <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-[#fbc7d4]' />
                        <span>All Tutors</span>
                    </h2>

                   
                    <Button 
                        variant='flat' 
                        startContent={<Filter className="w-4 h-4" />}
                        className="rounded-full font-bold bg-[#16181d] border border-[#22252e] text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-200"
                    >
                        Filters
                    </Button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* {
                        courses?.map((courses) => <CourseCard key={courses._id}></CourseCard>)
                    } */}

                  
                  {courses.map((item) => (
                   <CourseCard key={item._id} course={item} />
                   ))} 

                </div>
                
            </main>
        </div>
    );
};

export default TutorsPage;



