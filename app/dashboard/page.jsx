'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VehicleList from '@/components/dashboard/VehicleList';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          setLoading(true);
          const [listingsRes, purchasesRes, favoritesRes] = await Promise.all([
            fetch('/api/vehicles/listings', { headers: { 'Content-Type': 'application/json' } }),
            fetch('/api/vehicles/purchases', { headers: { 'Content-Type': 'application/json' } }),
            fetch('/api/vehicles/favorites', { headers: { 'Content-Type': 'application/json' } }),
          ]);

          const listingsData = await listingsRes.json();
          const purchasesData = await purchasesRes.json();
          const favoritesData = await favoritesRes.json();

          if (!listingsRes.ok) throw new Error(listingsData.error || 'Failed to fetch listings');
          if (!purchasesRes.ok) throw new Error(purchasesData.error || 'Failed to fetch purchases');
          if (!favoritesRes.ok) throw new Error(favoritesData.error || 'Failed to fetch favorites');

          setListings(listingsData.vehicles || []);
          setPurchases(purchasesData.vehicles || []);
          setFavorites(favoritesData.vehicles || []);
        } catch (err) {
          console.error('Dashboard fetch error:', err);
          setError(err.message || 'Failed to load dashboard data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-gray-600 mb-8">
              Manage your vehicle listings, view your purchases, and check your favorite vehicles.
            </p>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>
            )}
            <div className="space-y-8">
              <VehicleList
                title="Your Listings"
                vehicles={listings}
                emptyMessage="You haven't listed any vehicles yet."
                type="listings"
              />
              <VehicleList
                title="Purchased Vehicles"
                vehicles={purchases}
                emptyMessage="You haven't purchased any vehicles yet."
                type="purchases"
              />
              <VehicleList
                title="Favorite Vehicles"
                vehicles={favorites}
                emptyMessage="You haven't favorited any vehicles yet."
                type="favorites"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}