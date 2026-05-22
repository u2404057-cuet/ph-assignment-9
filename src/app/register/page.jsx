"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to better-auth when ready
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registered with:", email);
      // router.push('/login');
    }, 1000);
  };

  return (
    <div className="flex-1 bg-[#0D0D0D] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#E63946] rounded-full filter blur-[128px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#E63946] rounded-full filter blur-[128px] opacity-5 pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C] shadow-2xl relative z-10">
        {/* Subtle left border accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E63946]"></div>
        
        <div className="text-center">
          <h2 className="mt-2 text-4xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5]">
            JOIN DRIVE<span className="text-[#E63946]">FLEET</span>
          </h2>
          <p className="mt-2 text-sm font-['Outfit',_sans-serif] text-[#A0A0A0]">
            Create an account to start managing cars and bookings.
          </p>
        </div>
        
        <form className="mt-8 space-y-6 font-['Outfit',_sans-serif]" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#F5F5F5] mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors sm:text-sm"
                placeholder="John Doe"
              />
            </div>
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors sm:text-sm"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-[#A0A0A0]">Must be at least 8 characters long.</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E63946] hover:bg-[#C1121F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63946] focus:ring-offset-[#1A1A1A] transition-colors disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm font-['Outfit',_sans-serif] text-[#A0A0A0]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#E63946] hover:text-[#C1121F] transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
