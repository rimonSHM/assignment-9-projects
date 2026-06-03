// import { Chip } from '@heroui/react';
// import { BookOpen, Clock, BarChart, Users } from 'lucide-react';
// import Image from 'next/image';


// const fetchSingleCourse = async (id) => {
   
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`);
//       const data = res.json();
//       return data || {};
// };

// export default async function CourseDetails({params}) {
 
//       const { id } = await params;
//       const tutors = await fetchSingleCourse(id);
//       const { _id, title, description, thumbnail, category, price, duration, instructor } = tutors;




     
//     const featuredItems = [
//         { icon: Clock, label: duration || '12h 30m' },
//         { icon: BarChart, label: title || 'Beginner' },
//         { icon: BookOpen, label: `24 Lessons` },
//         { icon: Users, label: `0 Students` },
//     ];
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
//                 <div className="lg:col-span-2 space-y-8">
//                     <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
//                         <Image
//                             src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'}
//                             alt={title}
//                             fill
//                             className="object-cover transform transition duration-700 group-hover:scale-105"
//                         />
//                         <div className="absolute top-6 left-6">
//                             <Chip
//                                 color="primary"
//                                 variant="solid"
//                                 className="font-bold shadow-xl"
//                             >
//                                 Premium
//                             </Chip>
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
//                             Mastering Next - From Beginner to Pro
//                         </h1>
//                         <p className="text-xl text-slate-500 leading-relaxed">
//                             Master the core concepts of this subject with our comprehensive guide designed for all skill levels.
//                         </p>
//                     </div>

//                     <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
//                         {featuredItems.map((item, i) => (
//                             <div
//                                 key={i}
//                                 className="flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-white hover:shadow-lg transition-all duration-300"
//                             >
//                                 <item.icon className="w-5 h-5 text-blue-600" />
//                                 <span className='text-slate-500'>{item.label}</span>
//                             </div>
//                         ))}
//                     </div>


//                     <p className="text-xs font-bold text-slate-400 italic">
//                         Last enrolled:
//                     </p>

//                 </div>

//                 <div className="lg:col-span-1">
//                     <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-8">
//                         <div className="space-y-2">
//                             <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Course Price</p>
//                             <div className="flex items-baseline gap-2">
//                                 <span className="text-5xl font-black text-blue-600">Free</span>
//                                 <span className="text-slate-400 line-through font-bold">$199</span>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <p className="text-slate-700 font-medium">
//                                 <strong>Instructor:</strong>  Industry Expert
//                             </p>
//                             <div className="w-full h-px bg-slate-100"></div>
//                             <ul className="space-y-3">
//                                 {['Lifetime Access', 'Expert Guidance', 'Verified Certificate'].map((item, i) => (
//                                     <li
//                                         key={i}
//                                         className="flex items-center gap-3 text-sm font-bold text-slate-500"
//                                     >
//                                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
//                                         {item}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <p className="text-center text-xs text-slate-500 font-bold">30-Day Money-Back Guarantee • Secure Payment</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



// const NotFound = () => {
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-24 text-center">
//             <h2 className="text-2xl font-bold text-red-500">Course not found</h2>
//             <p className="text-muted-foreground mt-2">Please log in to view protected course details.</p>
//         </div>
//     );
// }







import EnrollmentButton from '@/components/EnrollmentButton';
import { auth } from '@/lib/auth';
import { Chip } from '@heroui/react';
import { BookOpen, Clock, BarChart, Users } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';

const fetchSingleCourse = async (id, token) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`, { 
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${token}` || '',
            }
         });
        if (!res.ok) return {};
        
       
        const data = await res.json();
        return data || {};
    } catch (error) {
        console.error("Fetch error:", error);
        return {};
    }
};

export default async function CourseDetails({ params }) {
    const { id } = await params;

      const {token} = await auth.api.getToken({
        headers: await headers()
      });
      

    const tutors = await fetchSingleCourse(id, token);
    
    console.log(tutors);
    
    // if (!tutors || Object.keys(tutors).length === 0) {
    //     return <NotFound />;
    // }

    const { _id,  enrolledStudents, title, description, thumbnail, category, price, duration, instructor } = tutors;
   
    
    const featuredItems = [
        { icon: Clock, label: duration || '12h 30m' },
        { icon: BarChart, label: category || 'Beginner' },
        { icon: BookOpen, label: `24 Lessons` },
        { icon: Users, label: `${ enrolledStudents || 0} Students` },
        
        ];
    return (
        // ব্যাকগ্রাউন্ড লাক্সারি ডিপ ডার্ক থিম করা হয়েছে
        <div className="min-h-screen bg-[#0f1115] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                    {/* Left Column - Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative group overflow-hidden rounded-[2.5rem] border border-[#22252e] shadow-2xl aspect-video bg-[#1f222a]">
                            <Image
                                src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200'}
                                alt={title || "Course Image"}
                                fill
                                className="object-cover transform transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6">
                                {/* কাস্টম ফ্ল্যাট রোজ পিঙ্ক চিপ */}
                                <Chip
                                    variant="flat"
                                    className="font-bold bg-[#1f222a]/90 text-[#fbc7d4] border border-[#2a2d36] backdrop-blur-md px-4 py-1"
                                >
                                    {category || "Premium"}
                                </Chip>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* টেক্সট কালার হোয়াইট করা হয়েছে এবং ডাটা ডাইনামিক */}
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                {title || "Mastering Next - From Beginner to Pro"}
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                {description || "Master the core concepts of this subject with our comprehensive guide designed for all skill levels."}
                            </p>
                        </div>

                        {/* ইনফো ব্যাজেস - ডার্ক থিম ও রোজ পিঙ্ক আইকন */}
                        <div className="flex flex-wrap gap-4 pt-8 border-t border-[#22252e]">
                            {featuredItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-[#16181d] px-6 py-3 rounded-2xl border border-[#22252e] text-gray-300 font-bold hover:border-gray-600 transition-all duration-300"
                                >
                                    <item.icon className="w-5 h-5 text-[#fbc7d4]" />
                                    <span className='text-gray-300'>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs font-bold text-gray-500 italic">
                            Last enrolled: Just now
                        </p>
                    </div>

                    {/* Right Column - Sticky Card */}
                    <div className="lg:col-span-1">
                        {/* সলিড লাক্সারি ডার্ক কার্ড bg-[#16181d] এবং border-[#22252e] */}
                        <div className="sticky top-24 bg-[#16181d] p-8 rounded-[2rem] border border-[#22252e] shadow-2xl space-y-8">
                            <div className="space-y-2">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Course Price</p>
                                <div className="flex items-baseline gap-2">
                                    {/* প্রাইস কালার রোজ পিঙ্ক (#fbc7d4) করা হয়েছে */}
                                    <span className="text-5xl font-black text-[#fbc7d4]">
                                        {price && price > 0 ? `$${price}` : "Free"}
                                    </span>
                                    {price && price > 0 && (
                                        <span className="text-gray-500 line-through font-bold">${price + 99}</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-300 font-medium">
                                    <strong>Instructor:</strong> <span className="text-[#fbc7d4]">{instructor || "Industry Expert"}</span>
                                </p>
                                <div className="w-full h-px bg-[#22252e]"></div>
                                <ul className="space-y-3">
                                    {['Lifetime Access', 'Expert Guidance', 'Verified Certificate'].map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-sm font-bold text-gray-400"
                                        >
                                            {/* বুলেট পয়েন্টের কালার রোজ পিঙ্ক */}
                                            <div className="w-1.5 h-1.5 bg-[#fbc7d4] rounded-full"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <EnrollmentButton tutors={tutors}></EnrollmentButton>
                            <p className="text-center text-xs text-gray-500 font-bold">30-Day Money-Back Guarantee • Secure Payment</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-center px-4">
            <div className="bg-[#16181d] p-12 rounded-3xl border border-[#22252e] max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-red-500">Course not found</h2>
                <p className="text-gray-400 mt-2">Please check your API backend or parameters.</p>
            </div>
        </div>
    );
};


