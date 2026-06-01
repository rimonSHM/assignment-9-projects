 


'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input, Button } from "@heroui/react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export default function Register() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...registerData,
    });

    if (error) {
      toast.error("Registration failed");
      return;
    }

    toast.success("Registration successful");
    router.push("/");
  };

  const handleGoogleRegister = async () => {
       await authClient.signIn.social({
        provider: "google"
       })
  }

  return (
    <div className="min-h-[85vh] flex flex-col bg-[#111318]  py-12 text-slate-800">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* মেইন কার্ড - একদম ক্লিন হোয়াইট থিম */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/80 shadow-2xl space-y-8 relative overflow-hidden">
            
            {/* টপ-রাইট কর্নারে হালকা রোজ পিঙ্ক গ্লো */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbc7d4]/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-950 tracking-tight">
                Join <span className="text-[#fbc7d4] drop-shadow-sm">Mentora</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm">
                Create your account to start learning
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>

              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  variant="bordered"
                  startContent={<User className="w-5 h-5 text-slate-400 shrink-0 self-center" />}
                  className="w-full h-14 bg-transparent rounded-2xl"
                  classNames={{
                    base: "h-14",
                    mainWrapper: "h-full",
                    inputWrapper: [
                      "h-full rounded-2xl bg-slate-50 border border-slate-200 px-4 shadow-none",
                      "data-[hover=true]:border-slate-400",
                      "group-data-[focus=true]:!border-[#fbc7d4] group-data-[focus=true]:bg-white",
                      "transition-all duration-300"
                    ].join(" "),
                    input: "text-slate-900 text-base placeholder:text-slate-400 ml-1"
                  }}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  variant="bordered"
                  startContent={<Mail className="w-5 h-5 text-slate-400 shrink-0 self-center" />}
                  className="w-full h-14 bg-transparent rounded-2xl"
                  classNames={{
                    base: "h-14",
                    mainWrapper: "h-full",
                    inputWrapper: [
                      "h-full rounded-2xl bg-slate-50 border border-slate-200 px-4 shadow-none",
                      "data-[hover=true]:border-slate-400",
                      "group-data-[focus=true]:!border-[#fbc7d4] group-data-[focus=true]:bg-white",
                      "transition-all duration-300"
                    ].join(" "),
                    input: "text-slate-900 text-base placeholder:text-slate-400 ml-1"
                  }}
                />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-bold text-slate-700 ml-1">
                  Profile Image URL
                </label>
                <Input
                  id="image"
                  placeholder="https://images.unsplash.com/..."
                  type="url"
                  name="image"
                  variant="bordered"
                  startContent={<ImageIcon className="w-5 h-5 text-slate-400 shrink-0 self-center" />}
                  className="w-full h-14 bg-transparent rounded-2xl"
                  classNames={{
                    base: "h-14",
                    mainWrapper: "h-full",
                    inputWrapper: [
                      "h-full rounded-2xl bg-slate-50 border border-slate-200 px-4 shadow-none",
                      "data-[hover=true]:border-slate-400",
                      "group-data-[focus=true]:!border-[#fbc7d4] group-data-[focus=true]:bg-white",
                      "transition-all duration-300"
                    ].join(" "),
                    input: "text-slate-900 text-base placeholder:text-slate-400 ml-1"
                  }}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">
                  Password
                </label>
                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  variant="bordered"
                  startContent={<Lock className="w-5 h-5 text-slate-400 shrink-0 self-center" />}
                  className="w-full h-14 bg-transparent rounded-2xl"
                  classNames={{
                    base: "h-14",
                    mainWrapper: "h-full",
                    inputWrapper: [
                      "h-full rounded-2xl bg-slate-50 border border-slate-200 px-4 shadow-none",
                      "data-[hover=true]:border-slate-400",
                      "group-data-[focus=true]:!border-[#fbc7d4] group-data-[focus=true]:bg-white",
                      "transition-all duration-300"
                    ].join(" "),
                    input: "text-slate-900 text-base placeholder:text-slate-400 ml-1"
                  }}
                />
              </div>

              {/* মেইন সাবমিট বাটন */}
              <Button
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl bg-slate-900 border border-slate-950 text-white hover:bg-[#fbc7d4] hover:text-slate-950 transition-all duration-300 shadow-xl shadow-slate-900/10 group"
              >
                Create Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* গুগল সাইন-ইন বাটন */}
              <Button
                onClick={handleGoogleRegister}
                variant="bordered"
                className="w-full h-14 font-bold rounded-2xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors gap-3 shadow-sm"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  className="w-5 h-5"
                  alt="Google"
                />
                Sign in with Google
              </Button>

            </form>

            {/* বটম লিংক */}
            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#fbc7d4] font-black hover:underline underline-offset-4 drop-shadow-sm transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}






