




'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client"

import { Input, Button } from "@heroui/react";

import {
  Mail,
  Lock,
  ArrowRight
} from 'lucide-react';

import { toast } from 'sonner';


import { createAuthClient } from 'better-auth/react';

export default function Login() {



  const handleLogin = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      ...loginData,
      callbackURL: "/dashboard"
    });

    // dashboard
      // const { data:tokenData} = await authClient.token()
      // console.log(tokenData);

    if (error) {
      toast.error("Login failed");
      return;
    }

    toast.success("Login successful");
  };


    const handleGoogleLogin = async () => {
         await authClient.signIn.social({
          provider: "google"
         })
    }

  return (

    <div className="min-h-[85vh] flex flex-col bg-[#0f1115] py-12 text-white">

      <div className="grow flex items-center justify-center p-4">

        <div className="w-full max-w-md">

          <div className="bg-[#16181d5d] p-10 rounded-[2.5rem] border border-[#22252e] shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-md">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbc7d4]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            {/* Heading */}
            <div className="text-center space-y-2 relative">

              <h2 className="text-3xl font-black text-white tracking-tight">
                Welcome <span className="text-[#fbc7d4]">Back</span>
              </h2>

              <p className="text-gray-400 font-medium text-sm">
                Continue your learning journey today
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >

              {/* Email */}
              <div className="space-y-2">

                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-300 ml-1"
                >
                  Email Address
                </label>

                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  variant="bordered"
                  startContent={
                    <Mail className="w-5 h-5 text-gray-500 shrink-0 self-center" />
                  }
                  className="w-full"
                  classNames={{
                    inputWrapper:
                      "bg-[#111318] border border-[#22252e]",
                    input:
                      "text-white placeholder:text-gray-500"
                  }}
                />

              </div>

              {/* Password */}
              <div className="space-y-2">

                <label
                  htmlFor="password"
                  className="text-sm font-bold text-gray-300 ml-1"
                >
                  Password
                </label>

                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  variant="bordered"
                  startContent={
                    <Lock className="w-5 h-5 text-gray-500 shrink-0 self-center" />
                  }
                  className="w-full"
                  classNames={{
                    inputWrapper:
                      "bg-[#111318] border border-[#22252e]",
                    input:
                      "text-white placeholder:text-gray-500"
                  }}
                />

              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">

                <Link
                  href="#"
                  className="text-sm font-bold text-[#fbc7d4] hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl bg-[#1f222a] border border-[#2a2d36] text-[#fbc7d4]"
              >
                Sign In

                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Google Button */}
              <div className="space-y-4">

                <Button
                  onClick={handleGoogleLogin}
                  variant="bordered"
                  className="w-full h-14 font-bold rounded-2xl border-[#22252e] bg-[#111318] text-white gap-3"
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

              </div>

            </form>

            {/* Bottom Link */}
            <div className="text-center pt-2">

              <p className="text-sm text-gray-400 font-medium">

                New to Mentora?{" "}

                <Link
                  href="/register"
                  className="text-[#fbc7d4] font-black hover:underline"
                >
                  Create an account
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}