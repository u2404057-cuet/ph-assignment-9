import Link from 'next/link';

// Fetch all cars and find the specific one
// Fetch the specific car from the new backend endpoint
async function getCarById(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/cars/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const car = await res.json();
    return car;
  } catch (error) {
    console.error("Failed to fetch car:", error);
    return null;
  }
}

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return (
      <div className="flex-1 bg-[#0D0D0D] flex items-center justify-center min-h-screen font-['Outfit',_sans-serif]">
        <div className="text-center p-8 bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl max-w-md w-full mx-4">
          <svg className="w-16 h-16 mx-auto text-[#E63946] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-['Bebas_Neue',_sans-serif] text-[#F5F5F5] mb-2 tracking-wide">Vehicle Not Found</h2>
          <p className="text-[#A0A0A0] mb-6">The car you are looking for does not exist or has been removed from our fleet.</p>
          <Link href="/cars" className="inline-block px-6 py-3 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors">
            Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  const { carModel, dailyRentalPrice, imageURL, location, availability, features, description, vehicleRegistrationNumber } = car;

  return (
    <div className="flex-1 bg-[#0D0D0D] font-['Outfit',_sans-serif] min-h-screen pb-24">
      {/* Header Image Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full bg-[#1A1A1A] overflow-hidden border-b border-[#2C2C2C]">
        {imageURL ? (
          <img src={imageURL} alt={carModel} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2C2C2C]">
            <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent"></div>
        
        {/* Breadcrumb & Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <Link href="/cars" className="text-[#E63946] text-sm hover:text-white transition-colors mb-4 inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Fleet
            </Link>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <h1 className="text-5xl md:text-6xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] uppercase">
                {carModel || "Unknown Model"}
              </h1>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-wider ${availability ? 'bg-[#E63946] text-white' : 'bg-[#2C2C2C] text-[#A0A0A0]'}`}>
                  {availability ? "Available Now" : "Currently Booked"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Description */}
            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C]">
              <h3 className="text-2xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-4 border-b border-[#2C2C2C] pb-3">
                Vehicle <span className="text-[#E63946]">Description</span>
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed whitespace-pre-line">
                {description || "No description provided for this vehicle."}
              </p>
            </div>

            {/* Features */}
            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C]">
              <h3 className="text-2xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-6 border-b border-[#2C2C2C] pb-3">
                Premium <span className="text-[#E63946]">Features</span>
              </h3>
              {features && Array.isArray(features) && features.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-[#F5F5F5]">
                      <svg className="w-5 h-5 text-[#E63946] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#A0A0A0]">Standard features apply. Specific features not listed.</p>
              )}
            </div>

          </div>

          {/* Right Column (Booking Widget) */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2C2C2C] sticky top-24">
              <div className="mb-6 pb-6 border-b border-[#2C2C2C]">
                <p className="text-[#A0A0A0] text-sm uppercase tracking-wider mb-1">Daily Rate</p>
                <div className="flex items-baseline text-[#F5F5F5]">
                  <span className="text-5xl font-['Bebas_Neue',_sans-serif] text-[#E63946]">${dailyRentalPrice}</span>
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
                    <p className="text-[#F5F5F5] font-medium">{location || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-[#A0A0A0] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#A0A0A0] mb-0.5">Registration</p>
                    <p className="text-[#F5F5F5] font-medium">{vehicleRegistrationNumber || "N/A"}</p>
                  </div>
                </div>
              </div>

              {availability ? (
                <button className="w-full py-4 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]">
                  Proceed to Book
                </button>
              ) : (
                <button disabled className="w-full py-4 bg-[#2C2C2C] text-[#A0A0A0] font-medium rounded-md cursor-not-allowed">
                  Not Available
                </button>
              )}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
