'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VehicleCard from '@/components/vehicles/VehicleCard';
import ImageGallery from '@/components/vehicles/ImageGallery';
import VehicleTabs from '@/components/vehicles/VehicleTabs';
import Sidebar from '@/components/vehicles/Sidebar';
import { useSession } from 'next-auth/react';

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { data: session } = useSession();

  const [vehicle, setVehicle] = useState(null);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch vehicle details
        const vehicleResponse = await fetch(`/api/vehicles/${id}`);
        const vehicleData = await vehicleResponse.json();
        if (!vehicleResponse.ok) throw new Error(vehicleData.error || 'Failed to fetch vehicle');
        setVehicle(vehicleData.vehicle);

        // Fetch related vehicles
        const relatedResponse = await fetch('/api/vehicles?page=1');
        const relatedData = await relatedResponse.json();
        if (!relatedResponse.ok) throw new Error(relatedData.error || 'Failed to fetch related vehicles');

        // Filter and format related vehicles
        const related = relatedData.vehicles
          .filter((v) => v.type === vehicleData.vehicle.type && v.id !== vehicleData.vehicle.id)
          .slice(0, 3)
          .map((v) => ({
            id: v.id,
            title: v.title,
            type: v.type,
            price: v.price,
            year: v.year,
            mileage: v.mileage,
            location: v.location,
            image: v.image,
            fuelType: v.fuelType,
            engineSize: v.engineSize,
            listedDate: v.listedDate,
            sellerName: v.sellerName,
            isVerified: v.isVerified,
            isFavorite: v.isFavorite, // Use API-provided isFavorite
          }));
        setRelatedVehicles(related);
      } catch (err) {
        setError(err.message || 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The vehicle you're looking for doesn't exist or has been removed."}</p>
          <button
            onClick={() => router.push('/vehicles')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
          >
            Browse Vehicles
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} />
            <span>Back to results</span>
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ImageGallery
                photos={vehicle.photos}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
              />
              <VehicleTabs vehicle={vehicle} activeTab={activeTab} setActiveTab={setActiveTab} />
              <div>
                <h3 className="text-xl font-semibold mb-6">Similar Vehicles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedVehicles.map((relatedVehicle) => (
                    <VehicleCard key={relatedVehicle.id} vehicle={relatedVehicle} />
                  ))}
                </div>
              </div>
            </div>
            <Sidebar vehicle={vehicle} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}