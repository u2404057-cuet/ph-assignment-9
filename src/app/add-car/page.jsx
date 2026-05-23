"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AddCar() {

  const [isLoading, setIsLoading] = useState(false);
  // Default to localhost:8000 if env var is missing or not picked up by Next.js yet
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const cars = Object.fromEntries(formData.entries());
      
      // Basic formatting
      if (cars.dailyRentalPrice) {
        cars.dailyRentalPrice = Number(cars.dailyRentalPrice);
      }
      if (cars.features) {
        cars.features = cars.features.split(',').map(f => f.trim()).filter(f => f);
      }
      cars.availability = cars.availability === "on";

      const res = await fetch(`${apiUrl}/cars`, {
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
    <div className="flex-1 bg-[#0D0D0D] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
          <p className="mt-2 text-sm font-['Outfit',_sans-serif] text-[#A0A0A0]">
            Enter the details of the vehicle you want to list on DriveFleet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-['Outfit',_sans-serif]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Car Model */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Car Model</label>
              <input
                type="text"
                name="carModel"
                placeholder="e.g. BMW M4 Competition"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Daily Rental Price */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Daily Rental Price ($)</label>
              <input
                type="number"
                name="dailyRentalPrice"
                placeholder="e.g. 150"
                min="1"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Vehicle Registration Number */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Registration Number</label>
              <input
                type="text"
                name="vehicleRegistrationNumber"
                placeholder="e.g. XYZ-1234"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. New York, NY"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
                required
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Features</label>
              <input
                type="text"
                name="features"
                placeholder="e.g. GPS, Leather Seats, Backup Camera (comma separated)"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Image URL</label>
              <input
                type="url"
                name="imageURL"
                placeholder="https://example.com/car.jpg"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors"
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
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2C2C2C] text-[#F5F5F5] placeholder-[#A0A0A0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E63946] focus:border-[#E63946] transition-colors resize-none"
                required
              ></textarea>
            </div>
            
            {/* Availability Checkbox */}
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="availability"
                name="availability"
                className="h-4 w-4 bg-[#1A1A1A] border-[#2C2C2C] rounded text-[#E63946] focus:ring-[#E63946] focus:ring-offset-[#1A1A1A] cursor-pointer"
              />
              <label htmlFor="availability" className="ml-2 block text-sm text-[#F5F5F5] cursor-pointer">
                Available for immediate rental
              </label>
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
