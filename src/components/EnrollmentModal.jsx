


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

export default function EnrollmentModal({
  tutor,
  session,
  token,
  isOpen,
  onClose,
}) {
  const router = useRouter();

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ==========================================
  // Better Auth Session Auto-fill
  // ==========================================
  useEffect(() => {
    if (session?.user) {
      setStudentName(session.user.name || '');
      setStudentEmail(session.user.email || '');
    }
  }, [session]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setErrorMsg('');
    setPhone('');
    onClose();
  };

  // ==========================================
  // Submit Booking
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg('');

    try {
      // ==========================================
      // Get Token Fallback
      // ==========================================
      let activeToken = token;

      if (!activeToken || typeof activeToken !== 'string') {
        const sessionRes = await authClient.getSession();

        activeToken =
          sessionRes?.data?.session?.token ||
          sessionRes?.data?.token ||
          sessionRes?.token;

        if (!activeToken && authClient?.jwt) {
          const jwtRes = await authClient.jwt.getToken();
          activeToken = jwtRes?.data?.token || jwtRes?.token;
        }
      }

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

      // ==========================================
      // Booking API Call (Fixed with credentials)
      // ==========================================
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(activeToken && typeof activeToken === 'string'
            ? { Authorization: `Bearer ${activeToken.trim()}` }
            : {}),
        },
        // ⚠️ এটি সবচেয়ে গুরুত্বপুর্ণ: ব্রাউজারের Session Cookie পাস করার জন্য
        credentials: 'include',
        body: JSON.stringify({
          tutorId: tutor?._id,
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          phone: phone.trim(),
        }),
      });

      // ==========================================
      // Response Handlers
      // ==========================================
      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('Invalid JSON response:', jsonError);
        setErrorMsg('Server returned an invalid response.');
        toast.error('Server returned an invalid response.');
        return;
      }

      console.log('Booking response:', data);

      // SUCCESS
      if (res.ok && data.success) {
        handleClose();

        toast.success(
          data.message || 'Booking confirmed successfully! 🎉',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          }
        );

        setTimeout(() => {
          router.refresh();
        }, 500);

        return;
      }

      // API ERROR
      const message =
        data?.message || 'Booking failed. Please try again.';

      setErrorMsg(message);
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      setErrorMsg('Something went wrong! Please try again.');
      toast.error('Something went wrong! Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Enroll in Session
          </h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Student Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tutor Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Tutor Name
            </label>
            <input
              type="text"
              readOnly
              value={
                tutor?.tutorName || tutor?.name || 'Tutor Name'
              }
              className="w-full px-3 py-2 border border-slate-200 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-not-allowed select-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="0123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}