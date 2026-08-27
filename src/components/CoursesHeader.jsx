


"use client";

import SearchBar from "./SearchBar";

const CoursesHeader = ({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onReset,
}) => {
  return (
    <header className="bg-[#111318] border-b border-[#22252e] relative overflow-hidden py-12 md:py-16">
      {/* ব্যাকগ্রাউন্ড প্রিমিয়াম গ্লো ইফেক্ট */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-b from-[#3a6073]/15 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        {/* মেইন টাইটেল */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Explore Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fbc7d4] to-[#cbb4d4]">
            Premium
          </span>{" "}
          Tutors
        </h1>

        {/* সাবটাইটেল */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Find the perfect Tutors to advance your career. Learn
          production-grade workflows straight from industry veterans.
        </p>

        {/* সার্চ বার কন্টেইনার */}
        <div className="max-w-4xl mx-auto pt-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onReset={onReset}
          />
        </div>
      </div>
    </header>
  );
};

export default CoursesHeader;