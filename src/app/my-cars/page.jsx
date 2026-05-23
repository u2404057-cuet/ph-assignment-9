"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import Link from "next/link";
import MyCarCard from "@/components/MyCarCard";
import UpdateCarModal from "@/components/UpdateCarModal";
import DeleteCarModal from "@/components/DeleteCarModal";

export default function MyCarsPage() {
  const { data: session, isPending } = useSession();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Modal states
  const [carToUpdate, setCarToUpdate] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    // If auth is loaded and there is no session, redirect to login
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetchMyCars(session.user.email);
    }
  }, [session, isPending, router]);

  const fetchMyCars = async (email) => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/my-cars?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch my cars");
      const data = await res.json();
      setCars(data);
    } catch (error) {
      toast.danger("Could not load your cars.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSuccess = () => {
    if (session?.user?.email) {
      fetchMyCars(session.user.email);
    }
  };

  const handleDeleteSuccess = () => {
    if (session?.user?.email) {
      fetchMyCars(session.user.email);
    }
  };

  if (isPending || (isLoading && session?.user)) {
    return (
      <div className="flex-1 bg-[#0D0D0D] min-h-screen flex items-center justify-center font-['Outfit',_sans-serif]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
      </div>
    );
  }

  // Fallback if no user
  if (!session?.user) return null;

  return (
    <div className="flex-1 bg-[#0D0D0D] font-['Outfit',_sans-serif] min-h-screen pb-24 relative">
      
      {/* Header Section */}
      <section className="bg-[#1A1A1A] border-b border-[#2C2C2C] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-2">
              MY <span className="text-[#E63946]">CARS</span>
            </h1>
            <p className="text-[#A0A0A0] max-w-2xl text-lg">
              Manage the vehicles you have listed on DriveFleet.
            </p>
          </div>
          <Link 
            href="/add-car" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Car
          </Link>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <MyCarCard 
                key={car._id} 
                car={car} 
                onOpenUpdate={setCarToUpdate}
                onOpenDelete={setCarToDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl shadow-lg">
            <svg className="w-16 h-16 mx-auto text-[#A0A0A0] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-2xl font-medium text-[#F5F5F5] mb-3">No Listings Found</h3>
            <p className="text-[#A0A0A0] max-w-md mx-auto mb-8">
              You haven't listed any cars on our platform yet. Start earning by adding your vehicle to our fleet!
            </p>
            <Link 
              href="/add-car" 
              className="inline-block px-8 py-3 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors"
            >
              Add Your First Car
            </Link>
          </div>
        )}
      </section>

      {/* Modals */}
      <UpdateCarModal 
        isOpen={!!carToUpdate} 
        car={carToUpdate} 
        onClose={() => setCarToUpdate(null)} 
        onUpdate={handleUpdateSuccess}
      />

      <DeleteCarModal 
        isOpen={!!carToDelete} 
        car={carToDelete} 
        onClose={() => setCarToDelete(null)} 
        onDelete={handleDeleteSuccess}
      />
    </div>
  );
}
