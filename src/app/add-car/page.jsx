"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AddCar() {

  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Default to localhost:8000 if env var is missing or not picked up by Next.js yet
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    // If auth is loaded and there is no session, redirect to login
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("You must be logged in to add a car");
      return;
    }
    
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const cars = Object.fromEntries(formData.entries());
      
      // Basic formatting
      if (cars.dailyRentalPrice) {
        cars.dailyRentalPrice = Number(cars.dailyRentalPrice);
      }
      if (cars.seatCapacity) {
        cars.seatCapacity = Number(cars.seatCapacity);
      }
      // Convert Availability Status string to boolean for the database
      cars.availability = cars.availability === "Available";

      // Append User Information
      cars.userId = session.user.id;
      cars.userName = session.user.name;
      cars.userEmail = session.user.email;

      const res = await fetch(`${apiUrl}/my-cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cars),
      });

      if (res.ok) {
        toast.success("Car added to Fleet successfully!");
        e.target.reset(); // Clear the form
      } else {
        toast.error("Failed to add car. Server responded with an error.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Error: Could not connect to backend server.");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex-1 bg-[#0D0D0D] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-['Outfit',_sans-serif]">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#E63946] rounded-full filter blur-[128px] opacity-10 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C] shadow-2xl relative z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#E63946]"></div>
        
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-[#E63946] rounded mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5]">
            ADD A <span className="text-[#E63946]">CAR</span>
          </h1>
          <p className="mt-2 text-sm text-[#A0A0A0]">
            Enter the details of the vehicle you want to list on DriveFleet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Car Name */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Car Name</label>
              <input
                type="text"
                name="carModel"
                placeholder="e.g. BMW M4 Competition"
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Daily Rent Price */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Daily Rent Price ($)</label>
              <input
                type="number"
                name="dailyRentalPrice"
                placeholder="e.g. 150"
                min="1"
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Car Type */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Car Type</label>
              <select
                name="carType"
                defaultValue=""
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              >
                <option value="" disabled>Select Car Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            {/* Seat Capacity */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Seat Capacity</label>
              <input
                type="number"
                name="seatCapacity"
                placeholder="e.g. 5"
                min="1"
                max="15"
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Pickup Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Dhaka, Bangladesh"
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Availability Status */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Availability Status</label>
              <select
                name="availability"
                defaultValue="Available"
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Image URL</label>
              <input
                type="url"
                name="imageURL"
                placeholder="https://i.ibb.co/example.jpg"
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Tell us more about this car..."
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors resize-none"
                required
              ></textarea>
            </div>
            
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E63946] hover:bg-[#C1121F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63946] focus:ring-offset-[#1A1A1A] transition-colors disabled:opacity-70"
          >
            {isLoading ? "Adding Car..." : "Add Car to Fleet"}
          </button>
        </form>
      </div>
    </div>
  );
}
