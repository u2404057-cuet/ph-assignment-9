"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Cars', path: '/cars' },
  ];

  const navLinks = session 
    ? [...baseLinks, { name: 'Add Car', path: '/add-car' }, { name: 'My Bookings', path: '/my-bookings' }, {name: 'My Cars', path: '/my-cars'}]
    : baseLinks;

  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-[#2C2C2C] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            {/* Red Square Icon */}
            <div className="w-8 h-8 bg-[#E63946] rounded flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {/* DriveFleet Text */}
            <span className="font-['Bebas_Neue',_sans-serif] text-2xl tracking-wide text-[#F5F5F5] pt-1">
              DRIVE<span className="text-[#E63946]">FLEET</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-['Outfit',_sans-serif] text-[14px] px-3 py-2 rounded-md transition-colors duration-200 ${
                  pathname === link.path
                    ? 'text-[#E63946]'
                    : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] hover:border-[#E63946] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 focus:ring-offset-[#0D0D0D]"
                >
                  {session?.user?.image ? (
                    <img src={session.user.image} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <svg className="w-5 h-5 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl shadow-xl py-1 z-50 font-['Outfit',_sans-serif]">
                    <Link href="/add-car" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#A0A0A0] hover:bg-[#2C2C2C] hover:text-[#F5F5F5]">
                      Add Car
                    </Link>
                    <Link href="/my-cars" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#A0A0A0] hover:bg-[#2C2C2C] hover:text-[#F5F5F5]">
                      My Added Cars
                    </Link>
                    <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#A0A0A0] hover:bg-[#2C2C2C] hover:text-[#F5F5F5]">
                      My Bookings
                    </Link>
                    <div className="border-t border-[#2C2C2C] my-1"></div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-[#E63946] hover:bg-[#2C2C2C] font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  href="/login"
                  className="font-['Outfit',_sans-serif] text-[14px] px-4 py-2 rounded-md border border-[#2C2C2C] text-[#A0A0A0] hover:border-[#E63946] hover:text-[#E63946] transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="font-['Outfit',_sans-serif] text-[14px] px-4 py-2 rounded-md bg-[#E63946] text-white hover:bg-[#C1121F] transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-[#2C2C2C]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-['Outfit',_sans-serif] text-base ${
                  pathname === link.path
                    ? 'text-[#E63946] bg-[#1A1A1A]'
                    : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-4 border-t border-[#2C2C2C]">
            {session ? (
              <div className="px-5 space-y-3 font-['Outfit',_sans-serif]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] flex items-center justify-center">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <svg className="w-5 h-5 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-base font-medium text-[#F5F5F5]">{session?.user?.name || 'User'}</div>
                </div>
                <Link href="/add-car" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]">
                  Add Car
                </Link>
                <Link href="/my-cars" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]">
                  My Added Cars
                </Link>
                <Link href="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]">
                  My Bookings
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#E63946] hover:bg-[#1A1A1A]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 flex flex-col space-y-3 font-['Outfit',_sans-serif]">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md border border-[#2C2C2C] text-[#A0A0A0] hover:border-[#E63946] hover:text-[#E63946] transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md bg-[#E63946] text-white hover:bg-[#C1121F] transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
