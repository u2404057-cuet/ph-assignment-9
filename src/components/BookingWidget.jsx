"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { addToast } from "@heroui/toast";

export default function BookingWidget({ car }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    if (!session?.user) {
      addToast({ title: "Please log in to book a car", color: "danger" });
      return;
    }

    setIsLoading(true);

    const bookingData = {
      carId: car._id,
      carModel: car.carModel,
      dailyRentalPrice: car.dailyRentalPrice,
      imageURL: car.imageURL,
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      email: session.user.email, // Required for backend GET /bookings query
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      addToast({ title: `Successfully booked ${car.carModel}!`, color: "success" });
    } catch (error) {
      console.error(error);
      addToast({ title: "Booking failed. Please try again.", color: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C] sticky top-24">
      <div className="mb-6 pb-6 border-b border-[#2C2C2C]">
        <p className="text-[#A0A0A0] text-sm uppercase tracking-wider mb-1">Daily Rate</p>
        <div className="flex items-baseline text-[#F5F5F5]">
          <span className="text-5xl font-['Bebas_Neue',_sans-serif] text-[#E63946]">${car.dailyRentalPrice}</span>
          <span className="ml-2">/ day</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-[#A0A0A0] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-sm text-[#A0A0A0] mb-0.5">Pick-up Location</p>
            <p className="text-[#F5F5F5] font-medium">{car.location || "Not specified"}</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="w-5 h-5 text-[#A0A0A0] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
          <div>
            <p className="text-sm text-[#A0A0A0] mb-0.5">Registration</p>
            <p className="text-[#F5F5F5] font-medium">{car.vehicleRegistrationNumber || "N/A"}</p>
          </div>
        </div>
      </div>

      {car.availability ? (
        <button 
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full py-4 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] disabled:opacity-70"
        >
          {isLoading ? "Processing..." : "Proceed to Book"}
        </button>
      ) : (
        <button disabled className="w-full py-4 bg-[#2C2C2C] text-[#A0A0A0] font-medium rounded-md cursor-not-allowed">
          Not Available
        </button>
      )}
    </div>
  );
}
