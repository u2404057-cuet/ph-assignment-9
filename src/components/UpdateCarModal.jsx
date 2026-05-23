import { useState } from "react";
import { addToast } from "@heroui/toast";

export default function UpdateCarModal({ car, isOpen, onClose, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !car) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      const payload = {
        ...formValues,
        dailyRentalPrice: Number(formValues.dailyRentalPrice),
        availability: formValues.availability === "Available"
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/my-cars/${car._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      addToast({ title: "Car updated successfully!", color: "success" });
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      addToast({ title: "Failed to update car. Did you add the backend logic?", color: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 font-['Outfit',_sans-serif]">
      <div className="bg-[#1A1A1A] w-full max-w-2xl rounded-xl border border-[#2C2C2C] shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0A0A0] hover:text-[#E63946] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-6">
          UPDATE <span className="text-[#E63946]">{car.carModel}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Daily Rent Price */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Daily Rent Price ($)</label>
              <input
                type="number"
                name="dailyRentalPrice"
                defaultValue={car?.dailyRentalPrice || ""}
                min="1"
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded focus:outline-none focus:border-[#E63946]"
                required
              />
            </div>

            {/* Car Type */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Car Type</label>
              <select
                name="carType"
                defaultValue={car?.carType || ""}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded focus:outline-none focus:border-[#E63946]"
                required
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={car?.location || ""}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded focus:outline-none focus:border-[#E63946]"
                required
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Availability Status</label>
              <select
                name="availability"
                defaultValue={car?.availability ? "Available" : "Booked"}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded focus:outline-none focus:border-[#E63946]"
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
                defaultValue={car?.imageURL || ""}
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded focus:outline-none focus:border-[#E63946]"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#F5F5F5] mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={car?.description || ""}
                rows="3"
                className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2C2C2C] text-[#F5F5F5] rounded focus:outline-none focus:border-[#E63946] resize-none"
                required
              ></textarea>
            </div>
            
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#2C2C2C]">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-[#2C2C2C] text-[#F5F5F5] rounded hover:bg-[#2C2C2C] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#E63946] text-white rounded hover:bg-[#C1121F] transition-colors disabled:opacity-70"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
