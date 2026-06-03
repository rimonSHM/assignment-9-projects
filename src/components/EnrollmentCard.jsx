// import Image from "next/image";
// import { Chip } from '@heroui/react';
// // import CancelEnrollButton from "./CancelEnrollButton";

// const EnrollmentCard = () => {
//     return (
//         <div

//             className="flex gap-4 p-4 bg-white border rounded-xl"
//         >
//             <Image
//                 src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
//                 alt="course"
//                 width={120}
//                 height={90}
//                 className="rounded-lg"
//             />

//             <div className="flex flex-col grow justify-between">
//                 <div>
//                     <h3 className="font-bold">
//                         Mastering React - From Beginner to Pro
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                         Enrolled On:
//                     </p>
//                 </div>

//                 <div className="flex justify-between items-center">
//                     <Chip
//                         color="success"
//                         size="sm"
//                     >
//                         Active
//                     </Chip>

                 
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EnrollmentCard;




import Image from "next/image";
import { Chip } from '@heroui/react';
import CancelEnrollButton from "./CancelEnrollButton";

const EnrollmentCard = () => {
    return (
        <div
            className="flex gap-4 p-4 bg-[#16181d5d] border border-[#22252e] rounded-xl backdrop-blur-md"
        >
            <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
                alt="course"
                width={120}
                height={90}
                className="rounded-lg object-cover"
            />

            <div className="flex flex-col grow justify-between">
                <div>
                    <h3 className="font-bold text-white">
                        Mastering React - From Beginner to Pro
                    </h3>
                    <p className="text-sm text-gray-400">
                        Enrolled On:
                    </p>
                </div>

                <div className="flex justify-between items-center">
                    <Chip
                        variant="flat"
                        className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        size="sm"
                    >
                        Active
                    </Chip>

                      <CancelEnrollButton />
                </div>
            </div>
        </div>
    );
};

export default EnrollmentCard;