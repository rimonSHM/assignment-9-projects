

'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import EnrollmentModal from './EnrollmentModal';

export default function EnrollmentButton({ tutors, session: propsSession, token: propsToken }) {
  const [isOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Hydration mismatch ঠেকানোর জন্য

  const { data: clientSession, isPending } = useSession();

  // ক্লায়েন্ট সাইডে রেন্ডার সম্পন্ন হওয়া নিশ্চিত করা
  useEffect(() => {
    setMounted(true);
  }, []);

  const session = propsSession || clientSession;
  const token = propsToken || session?.session?.token || session?.accessToken || session?.token;

  const tutorData = tutors?.tutor || tutors;
  const isSlotOut = !tutorData?.totalSlot || tutorData?.totalSlot <= 0;

  return (
    <>
      {isSlotOut ? (
        <button
          disabled
          className="w-full py-4 bg-gray-800 text-gray-500 rounded-2xl font-bold cursor-not-allowed border border-[#22252e]"
        >
          No Slots Available
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={mounted && isPending} // Client mount হওয়ার পরেই disabled চেক করা
          className="w-full py-4 bg-[#fbc7d4] hover:bg-[#f8b4c4] text-black font-bold rounded-2xl transition duration-200 shadow-lg shadow-[#fbc7d4]/10 active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          {mounted && isPending ? 'Loading...' : 'Enroll Now'}
        </button>
      )}

      {/* Booking Modal Component */}
      <EnrollmentModal
        tutor={tutorData}
        session={session}
        token={token}
        isOpen={isOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}