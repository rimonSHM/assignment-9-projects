






// "use client";

// import { Input } from "@heroui/react";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, X, User, LogOut, GraduationCap, LayoutDashboard, Settings } from 'lucide-react';
// import { Button } from "@heroui/react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
  
//   // Simulation of Authentication State (Change to true to test logged in view)
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 

//   // Helper function to check if link is active
//   const isActive = (path) => pathname === path;
  
//   const linkStyles = (path) => `
//     text-sm font-medium transition-colors duration-200
//     ${isActive(path) ? 'text-[#fbc7d4] font-semibold' : 'text-gray-400 hover:text-white'}
//   `;

//   return (
//     <nav className="w-full bg-[#111318] border-b border-[#22252e] sticky top-0 z-50 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Left Section: Logo */}
//           <div className="flex-shrink-0 flex items-center gap-2">
//             <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:opacity-90">
//               <GraduationCap className="h-6 w-6 text-[#fbc7d4]" />
//               <span>Tutor<span className="text-[#fbc7d4]">Sphere</span></span>
//             </Link>
//           </div>

//           {/* Center Section: Desktop Menu Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className={linkStyles('/')}>Home</Link>
//             <Link href="/tutors" className={linkStyles('/tutors')}>Tutors</Link>
            
//             {/* Authenticated Links */}
//             {isLoggedIn && (
//               <>
//                 <Link href="/add-tutor" className={linkStyles('/add-tutor')}>Add Tutor</Link>
//                 <Link href="/my-tutors" className={linkStyles('/my-tutors')}>My Tutors</Link>
//                 <Link href="/booked-sessions" className={linkStyles('/booked-sessions')}>My Booked Sessions</Link>
//               </>
//             )}
//           </div>

//           {/* Right Section: Auth Action / Profile Dropdown */}
//           <div className="hidden md:flex items-center gap-4">
//             {isLoggedIn ? (
//               <div className="relative">
//                 <button 
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 focus:outline-none bg-[#16181d] border border-[#22252e] hover:border-gray-600 p-1.5 pr-3 rounded-full transition-all"
//                 >
//                   <img 
//                     src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
//                     alt="User profile" 
//                     className="w-7 h-7 rounded-full object-cover border border-gray-600"
//                   />
//                   <span className="text-xs font-medium text-gray-300">Alex M.</span>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-[#16181d] border border-[#22252e] rounded-xl shadow-xl py-2 z-50">
//                     <div className="px-4 py-2 border-b border-[#22252e] mb-1">
//                       <p className="font-bold text-sm text-white">Welcome back!</p>
//                       <p className="text-xs text-gray-400 truncate">alex@example.com</p>
//                     </div>
//                     <Link 
//                       href="/dashboard" 
//                       onClick={() => setIsProfileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1f222a] hover:text-[#fbc7d4] transition-colors"
//                     >
//                       <LayoutDashboard size={16} />
//                       Dashboard
//                     </Link>
//                     <Link 
//                       href="/profile" 
//                       onClick={() => setIsProfileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1f222a] hover:text-[#fbc7d4] transition-colors"
//                     >
//                       <User size={16} />
//                       Profile Page
//                     </Link>
//                     <button 
//                       onClick={() => { setIsProfileOpen(false); setIsLoggedIn(false); }}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 text-left border-t border-[#22252e] mt-1"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               // এখানে আলাদা করে Login এবং Register (Join Free) বাটন যোগ ও সম্পূর্ণ rounded-full করা হয়েছে
//               <>
//                 <Link href="/login" className="font-medium text-gray-300 hover:text-[#fbc7d4] transition-colors text-sm">
//                   Login
//                 </Link>
//                 <Link href="/register">
//                   <Button 
//                     variant="flat"
//                     className="font-bold rounded-full px-6 bg-[#1f222a] border border-[#2a2d36] text-[#fbc7d4] hover:bg-[#fbc7d4] hover:text-[#0f1115] transition-all duration-300 text-sm"
//                   >
//                     Register
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-400 hover:text-white p-2 rounded-lg focus:outline-none"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Mobile Drawer Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-[#111318] border-b border-[#22252e] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
//           <Link href="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-lg ${isActive('/') ? 'bg-[#16181d] text-[#fbc7d4]' : 'text-gray-400'}`}>Home</Link>
//           <Link href="/tutors" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-lg ${isActive('/tutors') ? 'bg-[#16181d] text-[#fbc7d4]' : 'text-gray-400'}`}>Tutors</Link>
          
//           {isLoggedIn ? (
//             <>
//               <Link href="/add-tutor" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-lg ${isActive('/add-tutor') ? 'bg-[#16181d] text-[#fbc7d4]' : 'text-gray-400'}`}>Add Tutor</Link>
//               <Link href="/my-tutors" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-lg ${isActive('/my-tutors') ? 'bg-[#16181d] text-[#fbc7d4]' : 'text-gray-400'}`}>My Tutors</Link>
//               <Link href="/booked-sessions" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-lg ${isActive('/booked-sessions') ? 'bg-[#16181d] text-[#fbc7d4]' : 'text-gray-400'}`}>My Booked Sessions</Link>
//               <hr className="border-[#22252e] my-2" />
//               <Link href="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white">Profile Page</Link>
//               <button 
//                 onClick={() => { setIsOpen(false); setIsLoggedIn(false); }} 
//                 className="w-full text-left block px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             // মোবাইল ভিউতেও বাটন দুটি পাশাপাশি গ্রিড আকারে সুন্দর গোল শেপে সেট করা হয়েছে
//             <div className="pt-4 border-t border-[#22252e] mt-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
//                   <Button variant="bordered" className="w-full rounded-full border-[#22252e] text-white hover:bg-[#1f222a]">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
//                   <Button variant="flat" className="w-full rounded-full bg-[#1f222a] border border-[#2a2d36] text-[#fbc7d4]">
//                     Register
//                   </Button>
//                 </Link>
//               </div>

//                <div className="flex flex-col gap-2">
//               <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account</p>
//               <button
//                 onClick={handleLogOut}
//                 className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl">Log Out</button>
//             </div>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


import {
  Menu,
  X,
  User,
  LogOut,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [session, setSession] = useState(null);

  // 🔥 SESSION LOAD (FIXED)
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data || null);
    };

    loadSession();
  }, [pathname]); // 👈 important: auto refresh on route change

  // 🔥 LOGOUT (FIXED)
  const handleLogOut = async () => {
    await authClient.signOut();

    setSession(null); // instant UI update
    setIsProfileOpen(false);

    router.push("/login");
    router.refresh();
  };

  const isActive = (path) => pathname === path;

  const linkStyles = (path) => `
    text-sm font-medium transition-colors duration-200
    ${
      isActive(path)
        ? "text-[#fbc7d4] font-semibold"
        : "text-gray-400 hover:text-white"
    }
  `;

  return (
    <nav className="w-full bg-[#111318] border-b border-[#22252e] sticky top-0 z-50 text-white">
   
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <GraduationCap className="h-6 w-6 text-[#fbc7d4]" />
            Tutor<span className="text-[#fbc7d4]">Sphere</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkStyles("/")}>Home</Link>
            <Link href="/tutors" className={linkStyles("/tutors")}>Tutors</Link>

            {/* 🔥 AUTH ONLY MENU */}
            {session && (
              <>
                <Link href="/add-tutor" className={linkStyles("/add-tutor")}>
                  Add Tutor
                </Link>
                <Link href="/my-tutors" className={linkStyles("/my-tutors")}>
                  My Tutors
                </Link>
                <Link
                  href="/booked-sessions"
                  className={linkStyles("/booked-sessions")}
                >
                  My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">

            {/* LOGGED IN */}
            {session ? (
              <div className="relative">

                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-[#16181d] border border-[#22252e] p-1.5 pr-3 rounded-full"
                >
                  <img
                    src={
                      session?.user?.image ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    className="w-8 h-8 rounded-full object-cover"
                    alt="profile"
                  />
                  <span className="text-sm">
                    {session?.user?.name}
                  </span>
                </button>

                {/* DROPDOWN */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#16181d] border border-[#22252e] rounded-xl shadow-xl py-2">

                    <div className="px-4 py-2 border-b border-[#22252e]">
                      <p className="font-bold text-sm">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session?.user?.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#1f222a]"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#1f222a]"
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              /* LOGGED OUT */
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-[#fbc7d4]"
                >
                  Login
                </Link>

                <Link href="/register">
                  <Button className="rounded-full bg-[#1f222a] text-[#fbc7d4]">
                    Register
                  </Button>
                </Link>
              </>
            )}

          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </div>
  
  
    ...


     
    </nav>
  );
}







