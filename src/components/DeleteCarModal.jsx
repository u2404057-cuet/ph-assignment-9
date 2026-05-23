import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteCarModal({ car, isOpen, onClose, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !car) return null;

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(`${apiUrl}/my-cars/${car._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Car deleted successfully!");
      onDelete(car._id);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete car. Did you add the backend logic?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 font-['Outfit',_sans-serif]">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-xl border border-[#2C2C2C] shadow-2xl p-6 relative">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#E63946]/10 border border-[#E63946]/20 rounded-full flex items-center justify-center mb-4 text-[#E63946]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-2">
            Delete Listing?
          </h2>
          <p className="text-[#A0A0A0] text-sm mb-6">
            Are you sure you want to permanently delete the <span className="text-[#F5F5F5]">{car.carModel}</span> listing? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-4 border-t border-[#2C2C2C]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 border border-[#2C2C2C] text-[#F5F5F5] font-medium rounded hover:bg-[#2C2C2C] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-6 py-2 bg-[#E63946] text-white font-medium rounded hover:bg-[#C1121F] transition-colors disabled:opacity-70"
          >
            {isLoading ? "Deleting..." : "Yes, Delete It"}
          </button>
        </div>
      </div>
    </div>
  );
}
