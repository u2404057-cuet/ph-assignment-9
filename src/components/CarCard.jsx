import Link from 'next/link';

export default function CarCard({ car }) {
  const { _id, carModel, dailyRentalPrice, imageURL, location, availability, features, booking_count } = car;

  return (
    <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl overflow-hidden group hover:border-[#E63946] transition-colors duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0D0D0D]">
        {imageURL ? (
          <img 
            src={imageURL} 
            alt={carModel || "Car Image"} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#A0A0A0]">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${availability ? 'bg-[#E63946] text-white' : 'bg-[#2C2C2C] text-[#A0A0A0]'}`}>
            {availability ? "Available" : "Booked"}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] truncate pr-2">
            {carModel || "Unknown Model"}
          </h3>
          <div className="text-right flex-shrink-0">
            <span className="text-2xl font-['Bebas_Neue',_sans-serif] text-[#E63946]">${dailyRentalPrice}</span>
            <span className="text-[#A0A0A0] text-sm font-['Outfit',_sans-serif]">/day</span>
          </div>
        </div>

        {/* Location and Bookings */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-[#A0A0A0] text-sm font-['Outfit',_sans-serif]">
            <svg className="w-4 h-4 mr-1 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location || "Location not specified"}
          </div>
          <div className="flex items-center text-[#A0A0A0] text-sm font-['Outfit',_sans-serif]">
            <svg className="w-4 h-4 mr-1 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {booking_count || 0} {booking_count === 1 ? 'Booking' : 'Bookings'}
          </div>
        </div>

        {/* Features Preview (Up to 3) */}
        <div className="flex flex-wrap gap-2 mb-6 font-['Outfit',_sans-serif]">
          {features && Array.isArray(features) ? (
            features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="bg-[#0D0D0D] border border-[#2C2C2C] text-[#A0A0A0] text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))
          ) : null}
          {features && Array.isArray(features) && features.length > 3 && (
            <span className="bg-[#0D0D0D] border border-[#2C2C2C] text-[#A0A0A0] text-xs px-2 py-1 rounded">
              +{features.length - 3} more
            </span>
          )}
        </div>

        {/* Push button to bottom */}
        <div className="mt-auto pt-4 border-t border-[#2C2C2C]">
          <Link 
            href={`/cars/${_id}`}
            className="block w-full text-center py-2.5 px-4 bg-[#1A1A1A] border border-[#E63946] text-[#E63946] font-['Outfit',_sans-serif] font-medium rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-300"
          >
            Show More Details
          </Link>
        </div>
      </div>
    </div>
  );
}
