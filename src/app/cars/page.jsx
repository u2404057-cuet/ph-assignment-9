import CarCard from '@/components/CarCard';

// Fetch all cars from backend
async function getCars() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/cars`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}

export default async function ExploreCarsPage() {
  const cars = await getCars();

  return (
    <div className="flex-1 bg-[#0D0D0D] font-['Outfit',_sans-serif] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-[#1A1A1A] border-b border-[#2C2C2C] py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946] rounded-full filter blur-[128px] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-4">
            EXPLORE <span className="text-[#E63946]">FLEET</span>
          </h1>
          <p className="text-[#A0A0A0] max-w-2xl text-lg">
            Browse our complete collection of premium vehicles. Find the perfect ride for your next journey.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-8 border-b border-[#2C2C2C] pb-4">
          <h2 className="text-xl text-[#F5F5F5] font-medium">All Vehicles ({cars.length})</h2>
          {/* We can add sorting/filtering dropdowns here in the future */}
        </div>

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl">
            <svg className="w-16 h-16 mx-auto text-[#A0A0A0] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="text-2xl font-medium text-[#F5F5F5] mb-2">No Cars Found</h3>
            <p className="text-[#A0A0A0]">We currently have no cars available in our fleet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}
