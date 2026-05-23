import Link from 'next/link';

export default function BookedCarCard({ booking, onCancel }) {
  const { _id, carId, carModel, dailyRentalPrice, imageURL, bookingDate, status } = booking;

  // Format the date
  const formattedDate = new Date(bookingDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-lg hover:border-[#E63946] transition-colors duration-300">
      
      {/* Image Section */}
      <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-[#0D0D0D] flex-shrink-0">
        {imageURL ? (
          <img 
            src={imageURL} 
            alt={carModel || "Booked Car"} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2C2C2C]">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-1">
              {carModel || "Unknown Model"}
            </h3>
            <p className="text-[#A0A0A0] text-sm">Booking ID: <span className="font-mono text-[#F5F5F5]">{_id}</span></p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${status === 'confirmed' ? 'bg-[#15803d] text-white' : 'bg-[#E63946] text-white'}`}>
              {status || "Confirmed"}
            </span>
            <div className="text-right">
              <span className="text-2xl font-['Bebas_Neue',_sans-serif] text-[#E63946]">${dailyRentalPrice}</span>
              <span className="text-[#A0A0A0] text-sm">/day</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#2C2C2C] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[#A0A0A0]">
            <span className="block mb-1">Booked on:</span>
            <span className="text-[#F5F5F5]">{formattedDate}</span>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Link 
              href={`/cars/${carId}`}
              className="flex-1 sm:flex-none px-4 py-2 border border-[#2C2C2C] text-[#F5F5F5] text-sm font-medium rounded hover:bg-[#2C2C2C] transition-colors text-center"
            >
              View Car
            </Link>
            <button 
              onClick={() => onCancel(_id)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#E63946] text-white text-sm font-medium rounded hover:bg-[#C1121F] transition-colors"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
