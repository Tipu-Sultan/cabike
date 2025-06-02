import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 text-center">
          <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Listing Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your vehicle listing has been submitted for review. It will be live within 24 hours once approved.
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}