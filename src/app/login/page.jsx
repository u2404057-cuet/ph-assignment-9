"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    console.log(user);
    
    try {
      const { data, error } = await signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        throw new Error(error.message || "Invalid credentials");
      }
      
      toast.success("Login successful!");
      redirect("/");
    } catch (error) {
      toast.error(error.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await signIn.social({
        provider: "google",
        callbackURL: "/"
      });

      if (error) throw error;

    } catch (error) {
      toast.error("Google login failed");
    }
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

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E63946] hover:bg-[#C1121F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63946] focus:ring-offset-[#1A1A1A] transition-colors disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#2C2C2C]"></div>
              <span className="flex-shrink-0 mx-4 text-[#A0A0A0] text-sm">Or</span>
              <div className="flex-grow border-t border-[#2C2C2C]"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center py-3 px-4 border border-[#2C2C2C] rounded-md shadow-sm bg-[#1A1A1A] text-sm font-medium text-[#F5F5F5] hover:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63946] focus:ring-offset-[#1A1A1A] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
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
