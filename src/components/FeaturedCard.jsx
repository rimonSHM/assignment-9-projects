

// import { Chip } from "@heroui/react";
// import { Users } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const FeaturedCard = ({ course }) => {
//     const { _id, thumbnail, title, price, category } = course;


//     return (
//         // ১. bg-[#11131891] এর অপাসিটি ফিক্স করে সলিড লাক্সারি ডার্ক bg-[#16181d] এবং border-[#22252e] করা হয়েছে
//         <div
//             className=" bg-[#16181d] text-white rounded-3xl border border-[#22252e] overflow-hidden group hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
//         >
//             <div className="relative aspect-16/10 overflow-hidden bg-[#1f222a]">
//                 <Image src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'}

//                     alt="Course Image"
//                     height={400}
//                     width={640}
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute top-3 right-3">
//                     {/* ২. চিপের ডিফল্ট ব্লু কালার সরিয়ে কাস্টম ফ্ল্যাট রোজ পিঙ্ক স্টাইল দেওয়া হয়েছে */}
//                     <Chip
//                         size="sm"
//                         variant="flat"
//                         className="font-bold text-[10px] uppercase bg-[#1f222a]/90 text-[#fbc7d4] border border-[#2a2d36] backdrop-blur-md"
//                     >
//                         {category}
//                     </Chip>
//                 </div>
//             </div>
//             <div className="p-5 flex flex-col grow space-y-3">
//                 <Link href={`/courses/${_id}`}>
//                     {/* ৩. text-slate-900 সরিয়ে text-white এবং হোভারে রোজ পিঙ্ক (hover:text-[#fbc7d4]) করা হয়েছে */}
//                     <h4 className="font-bold text-white line-clamp-2 hover:text-[#fbc7d4] transition-colors duration-200">
//                         {title}
//                     </h4>
//                 </Link>
//                 {/* ৪. বর্ডার কালার border-slate-50 থেকে পরিবর্তন করে ডার্ক border-[#22252e] করা হয়েছে */}
//                 <div className="flex items-center justify-between pt-2 border-t border-[#22252e]">
//                     <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
//                         <Users className="w-3 h-3 text-[#3a6073]" />
//                         <span>0</span>
//                     </div>
//                     {/* ৫. টেক্সট কালার text-blue-600 থেকে পরিবর্তন করে text-white করা হয়েছে */}
//                     <span className="font-black text-white">${price}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FeaturedCard;




// "use client";

// import { Button, Chip } from "@heroui/react";
// import { BookOpen, Clock } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const CourseCard = ({ course }) => {
//     // সেফগার্ড: ডেটা অবজেক্ট আনডিফাইনড থাকলেও অ্যাপ ক্র্যাশ করবে না
//     if (!course) return null;

//     const { _id, title, thumbnail, category, price, duration, instructor } = course;

//     return (
//         <div
//             className=" w-full  group flex flex-col bg-[#16181d] rounded-3xl border border-[#22252e] hover:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
//         >
//             {/* Image Container */}
//             <div className=" w-full relative overflow-hidden aspect-[16/10] bg-[#1f222a]">
//                 <Image
//                     alt={title || "Course Image"}
//                     className="object-cover group-hover:scale-105 transition-transform duration-700"
//                     src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 33vw"
//                 />
                
//                 {/* HeroUI Custom Flat Chip */}
//                 {category && (
//                     <div className="absolute top-4 right-4 z-10">
//                         <Chip
//                             variant="flat"
//                             className="font-bold bg-[#1f222a]/90 text-[#fbc7d4] border border-[#2a2d36] backdrop-blur-md px-3 py-1 text-xs"
//                         >
//                             {category}
//                         </Chip>
//                     </div>
//                 )}
//             </div>

//             {/* Content Area */}
//             <div className="p-6 flex flex-col grow space-y-4">
//                 <div className="space-y-2">
//                     <Link href={`/tutors/${_id || ""}`}>
//                         <h3 className="text-lg font-bold leading-tight line-clamp-2 text-white hover:text-[#fbc7d4] transition-colors duration-200">
//                             {title || "Untitled Course"}
//                         </h3>
//                     </Link>
//                     <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
//                         By <span className="text-gray-200">{instructor || "Unknown Instructor"}</span>
//                     </p>
//                 </div>

//                 {/* Info Badges */}
//                 <div className="flex items-center gap-4 text-xs text-gray-400 font-bold">
//                     <span className="flex items-center gap-1">
//                         <Clock className="w-3.5 h-3.5 text-[#3a6073]" /> {duration || "Self-paced"}
//                     </span>
//                     <span className="flex items-center gap-1">
//                         <BookOpen className="w-3.5 h-3.5 text-[#cbb4d4]" /> 24 Lessons
//                     </span>
//                 </div>

//                 {/* Bottom Price & Action Button */}
//                 <div className="pt-5 mt-auto border-t border-[#22252e] flex justify-between items-center">
//                     <span className="text-xl font-black text-white">${price || 0}</span>

//                     {/* <Button
//                         < Link></Link>
//                         href={`/tutors/${_id || ""}`}
//                         variant="flat"
//                         className="font-bold rounded-xl px-5 bg-[#1f222a] border border-[#2a2d36] text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-200"
//                     >
//                         Learn More
//                     </Button> */}


//                     <Link href={`/tutors/${_id || ""}`}>
//   <Button
//     variant="flat"
//     className="font-bold rounded-xl px-5 bg-[#1f222a] border border-[#2a2d36] text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-200"
//   >
//     Learn More
//   </Button>
// </Link>


   
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourseCard;




"use client";

import { Button, Chip } from "@heroui/react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course }) => {
    if (!course) return null;

    const { _id, title, thumbnail, category, price, duration, instructor } = course;

    return (
        <div
            // ১. এখানে w-full এর সাথে flex-1 এবং grow যুক্ত করা হয়েছে, যেন প্যারেন্ট কন্টেইনার flex হলেও এটি পুরো উইডথ টেনে নেয়
            className="w-full flex-1 grow group flex flex-col bg-[#16181d] rounded-3xl border border-[#22252e] hover:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="w-full relative overflow-hidden aspect-[16/10] bg-[#1f222a]">
                <Image
                    alt={title || "Course Image"}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* HeroUI Custom Flat Chip */}
                {category && (
                    <div className="absolute top-4 right-4 z-10">
                        <Chip
                            variant="flat"
                            className="font-bold bg-[#1f222a]/90 text-[#fbc7d4] border border-[#2a2d36] backdrop-blur-md px-3 py-1 text-xs"
                        >
                            {category}
                        </Chip>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col grow space-y-4 w-full">
                <div className="space-y-2">
                    <Link href={`/tutors/${_id || ""}`}>
                        <h3 className="text-lg font-bold leading-tight line-clamp-2 text-white hover:text-[#fbc7d4] transition-colors duration-200">
                            {title || "Untitled Course"}
                        </h3>
                    </Link>
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        By <span className="text-gray-200">{instructor || "Unknown Instructor"}</span>
                    </p>
                </div>

                {/* Info Badges */}
                <div className="flex items-center gap-4 text-xs text-gray-400 font-bold">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#3a6073]" /> {duration || "Self-paced"}
                    </span>
                    <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#cbb4d4]" /> 24 Lessons
                    </span>
                </div>

                {/* Bottom Price & Action Button */}
                <div className="pt-5 mt-auto border-t border-[#22252e] flex justify-between items-center w-full">
                    <span className="text-xl font-black text-white">${price || 0}</span>

                    <Link href={`/tutors/${_id || ""}`}>
                        <Button
                            variant="flat"
                            className="font-bold rounded-xl px-5 py-3 bg-[#1f222a] border border-[#2a2d36] text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-200"
                        >
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;





