


"use client";

import { useEffect, useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2, X, CalendarDays } from "lucide-react";
import { toast } from "react-toastify";

export default function MyBookedSessions() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  // =====================================================
  // GET MY BOOKINGS
  // =====================================================
  const getMyBookings = useCallback(async () => {
    try {
      setLoading(true);

      const sessionRes = await authClient.getSession();
      const token =
        sessionRes?.data?.session?.token ||
        sessionRes?.data?.token ||
        sessionRes?.session?.token ||
        sessionRes?.token;

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const headers = {
        "Content-Type": "application/json",
      };

      if (token && typeof token === "string") {
        headers["Authorization"] = `Bearer ${token.trim()}`;
      }

      const res = await fetch(`${API_URL}/api/bookings/my-bookings`, {
        method: "GET",
        headers,
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.message || "Failed to load bookings");
      }
    } catch (error) {
      console.error("Get bookings error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMyBookings();
  }, [getMyBookings]);

  // =====================================================
  // CANCEL BOOKING (FIXED)
  // =====================================================
  // const handleCancel = async (bookingId) => {
  //   if (!bookingId) return;

  //   const confirmed = window.confirm(
  //     "Are you sure you want to cancel this booking?"
  //   );

  //   if (!confirmed) return;

  //   try {
  //     setCancelLoading(bookingId);

  //     // ১. Better Auth Session এবং Token প্রাপ্তি
  //     const sessionRes = await authClient.getSession();
  //     const token =
  //       sessionRes?.data?.session?.token ||
  //       sessionRes?.data?.token ||
  //       sessionRes?.session?.token ||
  //       sessionRes?.token;

  //     const API_URL =
  //       process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  //     const headers = {
  //       "Content-Type": "application/json",
  //     };

  //     // ২. Authorization Header যুক্ত করা
  //     if (token && typeof token === "string") {
  //       headers["Authorization"] = `Bearer ${token.trim()}`;
  //     }

  //     // ৩. DELETE API Request
  //     const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
  //       method: "DELETE",
  //       headers,
  //       credentials: "include",
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       toast.success(data.message || "Booking cancelled successfully!");

  //       // ৪. UI State এ রিয়েল-টাইম স্ট্যাটাস আপডেট
  //       setBookings((prev) =>
  //         prev.map((booking) =>
  //           booking._id === bookingId
  //             ? { ...booking, bookStatus: "Cancelled" }
  //             : booking
  //         )
  //       );
  //     } else {
  //       toast.error(data.message || "Failed to cancel booking");
  //     }
  //   } catch (error) {
  //     console.error("Cancel error:", error);
  //     toast.error("Something went wrong while cancelling!");
  //   } finally {
  //     setCancelLoading(null);
  //   }
  // };

  const handleCancel = async (bookingId) => {
  if (!bookingId) return;

  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  try {
    setCancelLoading(bookingId);

    const sessionRes = await authClient.getSession();
    console.log("Session Response:", sessionRes); // 🔍 Debug Log

    const token =
      sessionRes?.data?.session?.token ||
      sessionRes?.data?.token ||
      sessionRes?.session?.token ||
      sessionRes?.token;

    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    const headers = {
      "Content-Type": "application/json",
    };

    if (token && typeof token === "string") {
      headers["Authorization"] = `Bearer ${token.trim()}`;
    }

    console.log(`Sending DELETE request to: ${API_URL}/api/bookings/${bookingId}`); // 🔍 Debug Log

    const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
      method: "DELETE",
      headers,
      credentials: "include",
    });

    const data = await res.json();
    console.log("Cancel API Response Data:", data); // 🔍 Debug Log

    if (res.ok && data.success) {
      toast.success(data.message || "Booking cancelled successfully!");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, bookStatus: "Cancelled" }
            : booking
        )
      );
    } else {
      toast.error(data.message || "Failed to cancel booking");
    }
  } catch (error) {
    console.error("Cancel error:", error);
    toast.error("Something went wrong while cancelling!");
  } finally {
    setCancelLoading(null);
  }
};

  // UI - Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-black">
        <div className="flex items-center gap-3 text-emerald-400">
          <Loader2 size={25} className="animate-spin" />
          <span className="text-sm font-medium text-gray-200">
            Loading booked sessions...
          </span>
        </div>
      </div>
    );
  }

  // UI - Empty State
  if (bookings.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-black">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-4">
            <CalendarDays size={30} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">
            No Booked Sessions
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            You haven't booked any tutor sessions yet.
          </p>
        </div>
      </div>
    );
  }

  // UI - Main List Table
  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            My Booked Sessions
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            View and manage your booked tutor sessions.
          </p>
        </div>

        {/* Black Card */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden shadow-lg bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-300">
                    Name
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-300">
                    Phone
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-300">
                    Tutor Name
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-300">
                    Email
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-semibold text-gray-300">
                    Cancel
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const status = booking.bookStatus || "Pending";
                  const cancelled = status.toLowerCase() === "cancelled";

                  return (
                    <tr
                      key={booking._id}
                      className="border-b border-zinc-800 last:border-b-0 hover:bg-zinc-900/70 transition"
                    >
                      <td className="px-5 py-4 text-sm text-gray-200">
                        {booking.studentName || "N/A"}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-200">
                        {booking.phone || "N/A"}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-white">
                        {booking.tutorName || "N/A"}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-200">
                        {booking.studentEmail || "N/A"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                            cancelled
                              ? "bg-red-950 text-red-400 border border-red-800"
                              : status.toLowerCase() === "confirmed"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-orange-950 text-orange-400 border border-orange-800"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        {!cancelled ? (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelLoading === booking._id}
                            className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-red-800 text-red-400 hover:bg-red-950 hover:text-red-300 transition disabled:opacity-50"
                            title="Cancel booking"
                          >
                            {cancelLoading === booking._id ? (
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <X size={15} />
                            )}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-600">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}