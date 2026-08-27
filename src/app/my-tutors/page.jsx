



"use client";

import React, { useEffect, useState } from "react";
import {
  Trash2,
  Edit,
  Loader2,
  X,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

const MyTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // =====================================================
  // GET MY TUTORS
  // =====================================================

  const fetchMyTutors = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/my-tutors`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      console.log("MY TUTORS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to fetch tutors"
        );
      }

      setTutors(data?.tutors || []);
    } catch (error) {
      console.error(
        "❌ Fetch my tutors error:",
        error
      );

      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTutors();
  }, []);

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (tutor) => {
    setSelectedTutor({
      _id: tutor._id,

      tutorName: tutor.tutorName || "",
      photoURL: tutor.photoURL || "",
      subjectCategory:
        tutor.subjectCategory || "",

      availableDaysAndTime:
        tutor.availableDaysAndTime || "",

      hourlyFee:
        tutor.hourlyFee ?? "",

      totalSlot:
        tutor.totalSlot ?? "",

      sessionStartDate:
        tutor.sessionStartDate
          ? tutor.sessionStartDate.split("T")[0]
          : "",

      institution:
        tutor.institution || "",

      location:
        tutor.location || "",

      teachingMode:
        tutor.teachingMode || "Online",

      experience:
        tutor.experience || "",
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedTutor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE TUTOR
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedTutor?._id) {
      alert("Tutor ID not found!");
      return;
    }

    try {
      setUpdateLoading(true);

      const updatedTutorPayload = {
        tutorName:
          selectedTutor.tutorName.trim(),

        photoURL:
          selectedTutor.photoURL.trim(),

        subjectCategory:
          selectedTutor.subjectCategory.trim(),

        availableDaysAndTime:
          selectedTutor.availableDaysAndTime.trim(),

        hourlyFee:
          Number(selectedTutor.hourlyFee),

        totalSlot:
          Number(selectedTutor.totalSlot),

        sessionStartDate:
          selectedTutor.sessionStartDate,

        institution:
          selectedTutor.institution?.trim() || "",

        location:
          selectedTutor.location?.trim() || "",

        teachingMode:
          selectedTutor.teachingMode || "Online",

        experience:
          selectedTutor.experience?.trim() || "",
      };

      const response = await fetch(
        `${API_URL}/tutors/${selectedTutor._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          // ⭐ Better Auth cookie পাঠাবে
          credentials: "include",

          body: JSON.stringify(
            updatedTutorPayload
          ),
        }
      );

      const data = await response.json();

      console.log("UPDATE RESPONSE:", data);

      if (!response.ok) {
        alert(
          data?.message ||
            "Failed to update tutor"
        );
        return;
      }

      // Local state update
      setTutors((prev) =>
        prev.map((tutor) =>
          String(tutor._id) ===
          String(selectedTutor._id)
            ? {
                ...tutor,
                ...updatedTutorPayload,
              }
            : tutor
        )
      );

      setIsModalOpen(false);
      setSelectedTutor(null);

      alert("Tutor updated successfully! 🎉");
    } catch (error) {
      console.error(
        "❌ Update tutor error:",
        error
      );

      alert(
        "Something went wrong while updating tutor."
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // =====================================================
  // DELETE TUTOR
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tutor?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      const response = await fetch(
        `${API_URL}/tutors/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          // ⭐ Cookie session পাঠাবে
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log(
        "DELETE STATUS:",
        response.status
      );

      console.log(
        "DELETE RESPONSE:",
        data
      );

      if (!response.ok) {
        alert(
          data?.message ||
            "Failed to delete tutor"
        );
        return;
      }

      // Remove from UI
      setTutors((prev) =>
        prev.filter(
          (tutor) =>
            String(tutor._id) !== String(id)
        )
      );

      alert("Tutor deleted successfully! 🗑️");
    } catch (error) {
      console.error(
        "❌ Delete tutor error:",
        error
      );

      alert(
        "Something went wrong while deleting tutor."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (updateLoading) return;

    setIsModalOpen(false);
    setSelectedTutor(null);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <div className="min-h-screen bg-black text-gray-100 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
              My Tutors
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Manage your registered tutors
            </p>
          </div>

          {/* Table */}
          <div className="bg-[#111111] rounded-2xl shadow-lg border border-gray-800 overflow-hidden">

            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center gap-3 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />

                <span>
                  Loading tutors...
                </span>
              </div>
            ) : tutors.length === 0 ? (
              <div className="p-16 text-center text-gray-400">
                No tutors found.
              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>
                    <tr className="bg-[#1a1a1a] border-b border-gray-800">

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                        Tutor Name
                      </th>

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                        Subject
                      </th>

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                        Available
                      </th>

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                        Hourly Fee
                      </th>

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                        Total Slot
                      </th>

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                        Registration Date
                      </th>

                      <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase text-center">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-800">

                    {tutors.map((tutor) => (

                      <tr
                        key={tutor._id}
                        className="hover:bg-[#1a1a1a] transition-colors"
                      >

                        <td className="py-4 px-6 font-medium text-white">
                          {tutor.tutorName}
                        </td>

                        <td className="py-4 px-6 text-gray-300">
                          {tutor.subjectCategory}
                        </td>

                        <td className="py-4 px-6 text-gray-300 text-sm">
                          {tutor.availableDaysAndTime}
                        </td>

                        <td className="py-4 px-6 font-semibold text-white">
                          ৳{tutor.hourlyFee}
                        </td>

                        <td className="py-4 px-6">

                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              tutor.totalSlot > 3
                                ? "bg-emerald-900/60 text-emerald-300"
                                : tutor.totalSlot > 0
                                ? "bg-amber-900/60 text-amber-300"
                                : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {tutor.totalSlot} slots
                          </span>

                        </td>

                        <td className="py-4 px-6 text-gray-400 text-sm">
                          {tutor.sessionStartDate
                            ? new Date(
                                tutor.sessionStartDate
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </td>

                        <td className="py-4 px-6">

                          <div className="flex items-center justify-center gap-3">

                            {/* Edit */}
                            <button
                              onClick={() =>
                                handleEdit(tutor)
                              }
                              className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-900/40 hover:text-emerald-300 transition"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDelete(
                                  tutor._id
                                )
                              }
                              disabled={
                                deleteLoading ===
                                tutor._id
                              }
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-900/40 hover:text-red-300 transition disabled:opacity-50"
                              title="Delete"
                            >
                              {deleteLoading ===
                              tutor._id ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          UPDATE MODAL
      ===================================================== */}

      {isModalOpen &&
        selectedTutor && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b">

                <div>
                  <h2 className="text-xl font-bold">
                    Update Tutor
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Update your tutor information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Form */}
              <form
                onSubmit={handleUpdate}
                className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              >

                {/* Tutor Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tutor Name
                  </label>

                  <input
                    name="tutorName"
                    value={
                      selectedTutor.tutorName
                    }
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Photo URL
                  </label>

                  <input
                    name="photoURL"
                    value={
                      selectedTutor.photoURL
                    }
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>

                  <select
                    name="subjectCategory"
                    value={
                      selectedTutor.subjectCategory
                    }
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  >
                    <option value="">
                      Select Subject
                    </option>

                    <option value="Mathematics">
                      Mathematics
                    </option>

                    <option value="Physics">
                      Physics
                    </option>

                    <option value="Chemistry">
                      Chemistry
                    </option>

                    <option value="Biology">
                      Biology
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="ICT">
                      ICT
                    </option>
                  </select>
                </div>

                {/* Available */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Available Days & Time
                  </label>

                  <input
                    name="availableDaysAndTime"
                    value={
                      selectedTutor.availableDaysAndTime
                    }
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Fee */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hourly Fee
                  </label>

                  <input
                    type="number"
                    name="hourlyFee"
                    value={
                      selectedTutor.hourlyFee
                    }
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Slot */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Total Slot
                  </label>

                  <input
                    type="number"
                    name="totalSlot"
                    value={
                      selectedTutor.totalSlot
                    }
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Session Start Date
                  </label>

                  <input
                    type="date"
                    name="sessionStartDate"
                    value={
                      selectedTutor.sessionStartDate
                    }
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Institution
                  </label>

                  <input
                    name="institution"
                    value={
                      selectedTutor.institution
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>

                  <input
                    name="location"
                    value={
                      selectedTutor.location
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                </div>

                {/* Teaching Mode */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Teaching Mode
                  </label>

                  <select
                    name="teachingMode"
                    value={
                      selectedTutor.teachingMode
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  >
                    <option value="">
                      Select Mode
                    </option>

                    <option value="Online">
                      Online
                    </option>

                    <option value="Offline">
                      Offline
                    </option>

                    <option value="Both">
                      Both
                    </option>
                  </select>
                </div>

                {/* Experience */}
                <div className="md:col-span-2">

                  <label className="block text-sm font-medium mb-1">
                    Experience
                  </label>

                  <textarea
                    name="experience"
                    value={
                      selectedTutor.experience
                    }
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                  />

                </div>

                {/* Buttons */}
                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">

                  <button
                    type="button"
                    disabled={updateLoading}
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                  >

                    {updateLoading && (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    )}

                    {updateLoading
                      ? "Updating..."
                      : "Save Changes"}

                  </button>

                </div>

              </form>

            </div>

          </div>
        )}
    </>
  );
};

export default MyTutors;



