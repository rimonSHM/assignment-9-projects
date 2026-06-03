

import Image from 'next/image';
import { Button } from '@heroui/react';

import Link from 'next/link';
import EnrollmentCard from '@/components/EnrollmentCard';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export default async function MyTutorsPage() {

    const {token} = await auth.api.getToken( {
        headers: await headers()
    })

    const session = await auth.api.getSession( {
        headers: await headers()
    })
 
    // console.log(session)

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/${session.user.id}`, {
    headers: {
        authorization: `Bearer ${token}`
    }

   })
    
   const enrollments = await res.json();

   console.log(enrollments);


    return (
        <div className="max-w-6xl mx-auto px-4 py-12 text-white">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile */}
                <div className="w-full md:w-1/4">
                    <div className="p-6 bg-[#16181d5d] border border-[#22252e] rounded-2xl backdrop-blur-md">
                        {/* <Image
                            src="https://ui-avatars.com/api/?name=Test+Instructor&background=random"
                            alt="profile"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full"
                        /> */}

                        <h2 className="text-xl font-bold mt-4 text-white">
                            Test Instructor
                        </h2>
                        <p className="text-sm text-gray-400">
                            test@gmail.com
                        </p>
                    </div>
                </div>

                {/* Enrollments */}
                <div className="w-full md:w-3/4">
                    <h1 className="text-3xl font-bold mb-6 text-white">
                        My Enrolled <span className="text-[#fbc7d4]">Tutors</span>
                    </h1>

                    <div className="space-y-4">
                        <EnrollmentCard />


                    </div>

                </div>
            </div>
        </div >
    );
}


const NotFound = () => {
    return (
        <div className="p-12 text-center bg-[#16181d5d] border border-[#22252e] rounded-2xl backdrop-blur-md">
            <p className="mb-4 text-gray-300">No courses yet</p>

            <Link href="/courses">
                <Button className="bg-[#1f222a] border border-[#2a2d36] text-[#fbc7d4] hover:bg-[#fbc7d4] hover:text-[#0f1115] transition-all duration-300">
                    Browse Courses
                </Button>
            </Link>
        </div>
    );
}