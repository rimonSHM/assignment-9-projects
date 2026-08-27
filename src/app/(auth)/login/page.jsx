



"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Input, Button } from "@heroui/react";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // ============================
  // Email Login
  // ============================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.error) {
        console.error("Login error detail:", res.error);
        toast.error(res.error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Google Login
  // ============================
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col bg-[#0f1115] py-12 text-white">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#16181d5d] p-10 rounded-[2.5rem] border border-[#22252e] shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-md">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbc7d4]/5 rounded-full -mr-16 -mt-16 blur-3xl" />

            {/* Heading */}
            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-white">
                Welcome <span className="text-[#fbc7d4]">Back</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Continue your learning journey today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-300"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  variant="bordered"
                  startContent={<Mail className="w-5 h-5 text-gray-500" />}
                  className="w-full"
                  classNames={{
                    inputWrapper: "bg-[#111318] border border-[#22252e]",
                    input: "text-white placeholder:text-gray-500",
                  }}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-gray-300"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  variant="bordered"
                  startContent={<Lock className="w-5 h-5 text-gray-500" />}
                  className="w-full"
                  classNames={{
                    inputWrapper: "bg-[#111318] border border-[#22252e]",
                    input: "text-white placeholder:text-gray-500",
                  }}
                />
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-bold text-[#fbc7d4] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg font-black rounded-2xl bg-[#1f222a] border border-[#2a2d36] text-[#fbc7d4] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Google */}
              <Button
                type="button"
                onPress={handleGoogleLogin}
                variant="bordered"
                className="w-full h-14 font-bold rounded-2xl border-[#22252e] bg-[#111318] text-white gap-3"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                />
                Sign in with Google
              </Button>
            </form>

            {/* Register */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                New to Mentora?{" "}
                <Link
                  href={`/register?callbackUrl=${encodeURIComponent(
                    callbackUrl
                  )}`}
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

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1115]" />}>
      <LoginContent />
    </Suspense>
  );
}