import Link from 'next/link';

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] border-b border-[#2C2C2C]">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E63946]/20 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E63946] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-['Bebas_Neue',_sans-serif] tracking-wide text-[#F5F5F5] mb-6 leading-tight">
            UNLEASH THE THRILL <br />
            <span className="text-[#E63946]">DRIVE YOUR DREAM</span>
          </h1>
          <p className="text-lg md:text-xl text-[#A0A0A0] mb-10 max-w-2xl leading-relaxed">
            Experience premium car rentals with DriveFleet. Whether you need a sleek sports car for the weekend or a luxury sedan for your business trip, we have the perfect ride for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/cars" 
              className="px-8 py-4 bg-[#E63946] text-white font-medium rounded-md hover:bg-[#C1121F] transition-colors duration-300 text-center"
            >
              Explore Fleet
            </Link>
            <Link 
              href="/add-car" 
              className="px-8 py-4 bg-[#1A1A1A] border border-[#E63946] text-[#E63946] font-medium rounded-md hover:bg-[#E63946] hover:text-white transition-colors duration-300 text-center"
            >
              List Your Car
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
