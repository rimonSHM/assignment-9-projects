

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("searchTerm") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  // ফিল্টার আপডেট হলে URL চেঞ্জ করার ফাংশন
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (searchQuery) params.set("searchTerm", searchQuery);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      router.push(`?${params.toString()}`);
    }, 400); // 400ms Debounce

    return () => clearTimeout(timer);
  }, [searchQuery, startDate, endDate, router]);

  // ফিল্টার রিসেট
  const handleReset = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    router.push("/tutors"); // বা আপনার রুট ইউআরএল
  };

  return (
    <div className="bg-[#181a20] p-4 rounded-xl border border-[#262932] shadow-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Search Tutor */}
        <div>
          <label className="block text-xs text-left font-medium text-gray-400 mb-1 pl-1">
            Search Tutor
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tutor by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111318] border border-[#2e323e] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-xs text-left font-medium text-gray-400 mb-1 pl-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-[#111318] border border-[#2e323e] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-xs text-left font-medium text-gray-400 mb-1 pl-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-[#111318] border border-[#2e323e] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-end h-full pt-5">
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-[#22252e] hover:bg-[#2c303c] text-gray-200 border border-[#323644] font-medium py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;