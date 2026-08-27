



import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Building, GraduationCap, DollarSign, Calendar } from 'lucide-react';
import { Chip, Button } from '@heroui/react';

const TutorCard = ({ course }) => {
  const {
    _id,
    tutorName,
    photoURL,
    subjectCategory,
    hourlyFee,
    institution,
    location,
    teachingMode,
    availableDaysAndTime,
  } = course;

  return (
    <div className="bg-[#16181d] border border-[#22252e] rounded-2xl p-5 flex flex-col justify-between hover:border-gray-600 transition-all duration-300 shadow-lg">
      <div>
        {/* Header Image & Badge */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-800">
          <Image
            src={photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600"}
            alt={tutorName || "Tutor"}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            <Chip variant="solid" className="bg-[#1f222a]/90 text-[#fbc7d4] font-semibold text-xs border border-[#22252e]">
              {teachingMode || "Offline"}
            </Chip>
          </div>
        </div>

        {/* Category & Name */}
        <div className="mb-3">
          <span className="text-xs font-semibold text-[#fbc7d4] uppercase tracking-wider">
            {subjectCategory}
          </span>
          <h3 className="text-xl font-bold text-white mt-1 capitalize">
            {tutorName}
          </h3>
        </div>

        {/* Info Items */}
        <div className="space-y-2 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="truncate">{institution || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="truncate">{location || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="truncate">{availableDaysAndTime || "Flexible"}</span>
          </div>
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div className="pt-4 border-t border-[#22252e] flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500 block">Hourly Fee</span>
          <span className="text-xl font-black text-white flex items-center">
            ৳{hourlyFee}
            <span className="text-xs text-gray-400 font-normal">/hr</span>
          </span>
        </div>

        <Link href={`/tutors/${_id}`}>
          <Button
            size="sm"
            className="bg-[#fbc7d4] text-black font-bold hover:bg-[#f8a8bc] transition-colors rounded-xl"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;