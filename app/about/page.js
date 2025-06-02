import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">About Cabike</h1>
            <p className="text-gray-600">
              Learn about our mission to connect vehicle enthusiasts with trusted sellers.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Trust & Transparency
                </h3>
                <p className="text-gray-600">
                  Every vehicle is verified to ensure a secure buying and selling experience.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Seamless Transactions
                </h3>
                <p className="text-gray-600">
                  Our platform simplifies listing, browsing, and purchasing vehicles.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/vehicles"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-all"
              >
                Explore Vehicles <ChevronRight size={16} />
              </Link>
            </div>
          </div>
    
        </div>
      </div>
      <Footer />
    </div>
  );
}