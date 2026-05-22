"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to better-auth when ready
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in with:", email);
      // router.push('/');
    }, 1000);
  };

  return (
    <div className="flex-1 bg-[#0D0D0D] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative">
      <div className="max-w-md w-full space-y-8 bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C] shadow-2xl relative overflow-hidden z-10">
        {/* Subtle top border accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#E63946]"></div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-[#E63946] rounded mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="mt-2 text-4xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5]">
            WELCOME BACK
          </h2>
          <p className="mt-2 text-sm font-['Outfit',_sans-serif] text-[#A0A0A0]">
            Log in to manage your fleet and bookings.
          </p>
        </div>
        
        <form className="mt-8 space-y-6 font-['Outfit',_sans-serif]" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-[#F5F5F5] mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors sm:text-sm"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#F5F5F5] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-[#1A1A1A] border-[#2C2C2C] rounded text-[#E63946] focus:ring-[#E63946] focus:ring-offset-[#1A1A1A]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#A0A0A0]">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#E63946] hover:text-[#C1121F] transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E63946] hover:bg-[#C1121F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63946] focus:ring-offset-[#1A1A1A] transition-colors disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm font-['Outfit',_sans-serif] text-[#A0A0A0]">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-[#E63946] hover:text-[#C1121F] transition-colors">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
