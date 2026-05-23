"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import BookedCarCard from "@/components/BookedCarCard";
import Link from "next/link";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If auth is loaded and there is no session, redirect to login
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetchBookings(session.user.email);
    }
  }, [session, isPending, router]);

  const fetchBookings = async (email) => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/bookings?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      toast.danger("Could not load your bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    // Optimistic UI update or confirmation could go here
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      // Refetch from backend instead of local UI state manipulation
      toast.success("Booking cancelled successfully");
      if (session?.user?.email) {
        fetchBookings(session.user.email);
      }
    } catch (error) {
      console.error(error);
      toast.danger("Could not cancel the booking.");
    }
  };

  if (isPending || (isLoading && session?.user)) {
    return (
      <div className="flex-1 bg-[#0D0D0D] min-h-screen flex items-center justify-center font-['Outfit',_sans-serif]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
      </div>
    );
  }

  // Fallback if no user (though useEffect redirects)
  if (!session?.user) return null;

  return (
    <div className="flex-1 bg-[#0D0D0D] font-['Outfit',_sans-serif] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-[#1A1A1A] border-b border-[#2C2C2C] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-2 flex items-center gap-4">
            <span>MY <span className="text-[#E63946]">BOOKINGS</span></span>
            {bookings.length > 0 && (
              <span className="px-4 py-1 text-xl font-['Outfit',_sans-serif] font-medium bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] rounded-full">
                {bookings.length} {bookings.length === 1 ? 'Total Booking' : 'Total Bookings'}
              </span>
            )}
          </h1>
          <p className="text-[#A0A0A0] max-w-2xl text-lg">
            Manage all your upcoming and past vehicle reservations here.
          </p>
        </div>
      </section>

      {/* Bookings List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {bookings.length > 0 ? (
          <div className="flex flex-col gap-6">
            {bookings.map(booking => (
              <BookedCarCard 
                key={booking._id} 
                booking={booking} 
                onCancel={handleCancelBooking} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl shadow-lg">
            <svg className="w-16 h-16 mx-auto text-[#A0A0A0] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-medium text-[#F5F5F5] mb-3">No Bookings Found</h3>
            <p className="text-[#A0A0A0] max-w-md mx-auto mb-8">
              You haven't booked any cars yet. Explore our premium fleet and find the perfect ride for your next journey.
            </p>
            <Link 
              href="/cars" 
              className="inline-block px-8 py-3 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors"
            >
              Explore Fleet
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
