



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
  
  



     
    </nav>
  );
}







