'use client';

import { SellFormProvider } from '@/context/SellFormContext';
import ProgressIndicator from '@/components/sell/ProgressIndicator';
import VehicleTypeStep from '@/components/sell/VehicleTypeStep';
import VehicleDetailsStep from '@/components/sell/VehicleDetailsStep';
import PhotoUploadStep from '@/components/sell/PhotoUploadStep';
import ReviewStep from '@/components/sell/ReviewStep';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSellForm } from '@/context/SellFormContext';

function SellPageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { step } = useSellForm();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Sell Your Vehicle</h1>
            <p className="text-gray-600 mb-8">
              List your car or bike and connect with thousands of buyers
            </p>
            <ProgressIndicator />
            <div className="bg-white rounded-xl shadow-sm p-6">
              {session && (
                <>
                  {(() => {
                    switch (step) {
                      case 1:
                        return <VehicleTypeStep />;
                      case 2:
                        return <VehicleDetailsStep />;
                      case 3:
                        return <PhotoUploadStep />;
                      case 4:
                        return <ReviewStep />;
                      default:
                        return <VehicleTypeStep />; // Default to step 1
                    }
                  })()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SellPage() {
  return (
    <SellFormProvider>
      <SellPageContent />
    </SellFormProvider>
  );
}