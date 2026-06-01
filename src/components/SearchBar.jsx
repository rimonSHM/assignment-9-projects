



"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  // Controlled input ওয়ার্নিং এড়াতে ডিফল্ট ভ্যালু "" দেওয়া হয়েছে
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (search.trim()) {
      params.set("searchTerm", search.trim());
    } else {
      params.delete("searchTerm");
    }
    router.push(`/courses?${params.toString()}`);
  };

  // Enter কী প্রেস করলে যেন অটোমেটিক সার্চ হয়
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center bg-[#16181d] border border-[#22252e] rounded-2xl shadow-xl focus-within:border-[#3a6073]/80 focus-within:ring-4 focus-within:ring-[#3a6073]/10 transition-all duration-300 overflow-hidden">
      
      {/* Icon */}
      <div className="pl-5 text-gray-500">
        <Search className="w-5 h-5" />
      </div>

      {/* Input Field */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown} // Enter কী হ্যান্ডলার
        type="text"
        placeholder="Search for courses (e.g. Next.js, React...)"
        className="flex-1 h-14 px-4 outline-none bg-transparent text-white placeholder:text-gray-500 text-sm sm:text-base"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="h-10 px-6 mr-2 rounded-xl bg-gradient-to-r from-[#fbc7d4] to-[#cbb4d4] text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;