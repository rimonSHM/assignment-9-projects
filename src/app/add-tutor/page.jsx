



"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AddTutor = () => {
  const [loading, setLoading] = useState(false);
    
     



  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    const session = await authClient.getSession();
       console.log(session)
      const token = session?.data?.session?.token;

    try {
      const newTutor = {
        tutorName: form.tutorName.value.trim(),
        photoURL: form.photoURL.value.trim(),
        subjectCategory: form.subjectCategory.value,
        availableDaysAndTime: form.availableDaysAndTime.value.trim(),
        hourlyFee: Number(form.hourlyFee.value),
        totalSlot: Number(form.totalSlot.value),
        sessionStartDate: form.sessionStartDate.value,
        institution: form.institution.value.trim(),
        experience: form.experience.value.trim(),
        location: form.location.value.trim(),
        teachingMode: form.teachingMode.value,
        userId: session.data.user.id
      };

      // 🔴 Better Auth থেকে Active Session নেওয়া
       
        console.log(token)
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
           // Bearer Token verification-এর জন্য
        },
        body: JSON.stringify(newTutor),
      });
       
      const data = await response.json();
      

      if (response.ok) {
        toast.success("Tutor added successfully!");
        form.reset();
      } else {
        toast.error(data.message || "Failed to add tutor.");
      }
    } catch (error) {
      console.error("Add tutor error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <main className="pt-20 pb-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d0d0d] border border-[#262626] shadow-2xl rounded-2xl p-6 sm:p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white">Add Tutor</h1>
              <p className="text-gray-500 mt-2">
                Add a new tutor to your platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tutor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tutor Name
                </label>
                <input
                  type="text"
                  name="tutorName"
                  placeholder="MD Raju Molla"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-white"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-white"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject / Category
                </label>
                <select
                  name="subjectCategory"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white rounded-lg"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="ICT">ICT</option>
                </select>
              </div>

              {/* Available Days */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Available Days and Time
                </label>
                <input
                  type="text"
                  name="availableDaysAndTime"
                  placeholder="Sun - Thu 5:00 PM - 8:00 PM"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white placeholder-gray-600 rounded-lg"
                />
              </div>

              {/* Fee + Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Hourly Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hourly Fee
                  </label>
                  <input
                    type="number"
                    name="hourlyFee"
                    placeholder="400"
                    min="0"
                    required
                    className="w-full p-3 bg-[#151515] border border-[#303030] text-white rounded-lg"
                  />
                </div>

                {/* Total Slot */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Slot
                  </label>
                  <input
                    type="number"
                    name="totalSlot"
                    placeholder="10"
                    min="1"
                    required
                    className="w-full p-3 bg-[#151515] border border-[#303030] text-white rounded-lg"
                  />
                </div>
              </div>

              {/* Session Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Session Start Date
                </label>
                <input
                  type="date"
                  name="sessionStartDate"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white rounded-lg [color-scheme:dark]"
                />
              </div>

              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  placeholder="Khulna University"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white placeholder-gray-600 rounded-lg"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience
                </label>
                <textarea
                  name="experience"
                  rows="4"
                  placeholder="3 years teaching experience..."
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white placeholder-gray-600 rounded-lg resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location (Area/City)
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Khulna"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white placeholder-gray-600 rounded-lg"
                />
              </div>

              {/* Teaching Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teaching Mode
                </label>
                <select
                  name="teachingMode"
                  required
                  className="w-full p-3 bg-[#151515] border border-[#303030] text-white rounded-lg"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Tutor"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTutor;

