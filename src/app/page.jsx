import Link from 'next/link';
import CarCard from '@/components/CarCard';
import Banner from '@/components/Banner';

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

export default async function Home() {
  const cars = await getCars();
  // Display only up to 6 cars on the homepage
  const featuredCars = cars.slice(0, 6);

  return (
    <div className="flex-1 bg-[#0D0D0D] font-['Outfit',_sans-serif]">
      
      {/* 1. Hero Banner Section */}
      <Banner />
      {/* 2. Featured Fleet Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5]">
              OUR FEATURED <span className="text-[#E63946]">FLEET</span>
            </h2>
            <div className="w-16 h-1 bg-[#E63946] mx-auto mt-4 rounded"></div>
          </div>

          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl">
              <p className="text-[#A0A0A0] text-lg">No cars available at the moment. Check back soon!</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link 
              href="/cars" 
              className="inline-block px-8 py-3 border-2 border-[#2C2C2C] text-[#F5F5F5] font-medium rounded-md hover:border-[#E63946] hover:text-[#E63946] transition-colors duration-300"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Extra Section 1: Why Choose Us */}
      <section className="py-20 bg-[#1A1A1A] border-y border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5]">
              WHY CHOOSE <span className="text-[#E63946]">DRIVEFLEET</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#0D0D0D] border border-[#2C2C2C] rounded-full flex items-center justify-center mb-6 text-[#E63946]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#F5F5F5] mb-3">Secure & Safe</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                Every vehicle is thoroughly inspected, and all payments are processed through bank-grade secure encrypted gateways.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#0D0D0D] border border-[#2C2C2C] rounded-full flex items-center justify-center mb-6 text-[#E63946]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#F5F5F5] mb-3">Instant Booking</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                No long waiting times. Browse, select, and book your ideal car in less than 3 minutes directly from your device.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#0D0D0D] border border-[#2C2C2C] rounded-full flex items-center justify-center mb-6 text-[#E63946]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#F5F5F5] mb-3">Premium Selection</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                Access a curated fleet of high-end, luxury, and performance vehicles that deliver an unforgettable driving experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Extra Section 2: How It Works */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5]">
              HOW IT <span className="text-[#E63946]">WORKS</span>
            </h2>
            <div className="w-16 h-1 bg-[#E63946] mx-auto mt-4 rounded"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-[#2C2C2C] -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1 z-10 bg-[#0D0D0D] p-4">
              <div className="w-16 h-16 rounded-full bg-[#E63946] text-white flex items-center justify-center text-2xl font-['Bebas_Neue',_sans-serif] mb-6 shadow-[0_0_20px_rgba(230,57,70,0.4)]">
                1
              </div>
              <h3 className="text-lg font-medium text-[#F5F5F5] mb-2">Find Your Car</h3>
              <p className="text-[#A0A0A0] text-sm text-center">Browse our extensive collection of premium vehicles.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1 z-10 bg-[#0D0D0D] p-4">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-2 border-[#E63946] text-[#E63946] flex items-center justify-center text-2xl font-['Bebas_Neue',_sans-serif] mb-6">
                2
              </div>
              <h3 className="text-lg font-medium text-[#F5F5F5] mb-2">Book & Pay</h3>
              <p className="text-[#A0A0A0] text-sm text-center">Select your dates and securely pay online.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1 z-10 bg-[#0D0D0D] p-4">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-2 border-[#E63946] text-[#E63946] flex items-center justify-center text-2xl font-['Bebas_Neue',_sans-serif] mb-6">
                3
              </div>
              <h3 className="text-lg font-medium text-[#F5F5F5] mb-2">Hit The Road</h3>
              <p className="text-[#A0A0A0] text-sm text-center">Pick up your car and enjoy the ultimate drive.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
