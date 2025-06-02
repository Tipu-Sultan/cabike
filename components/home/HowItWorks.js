import { Car, Search, MessageCircle, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            RideMarket makes buying and selling vehicles simple, secure, and straightforward. Follow these steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="relative text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Search className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Search</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Browse our extensive collection of cars and bikes. Use filters to find exactly what you're looking for.
            </p>
            <div className="hidden lg:block absolute top-8 -right-8 w-16 h-[2px] bg-blue-200"></div>
          </div>

          {/* Step 2 */}
          <div className="relative text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Car className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Compare vehicles side by side to find the perfect match for your needs and budget.
            </p>
            <div className="hidden lg:block absolute top-8 -right-8 w-16 h-[2px] bg-blue-200"></div>
          </div>

          {/* Step 3 */}
          <div className="relative text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <MessageCircle className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Message sellers directly through our platform to ask questions or arrange viewings.
            </p>
            <div className="hidden lg:block absolute top-8 -right-8 w-16 h-[2px] bg-blue-200"></div>
          </div>

          {/* Step 4 */}
          <div className="relative text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <CreditCard className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Purchase</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Once you've found your perfect vehicle, make payment securely through our trusted platform.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-md"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}