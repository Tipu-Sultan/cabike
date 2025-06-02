'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, Flag, MapPin, Calendar, Gauge, Fuel, User, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import ContactForm from './ContactForm';
import { useSession } from 'next-auth/react';

export default function Sidebar({ vehicle }) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(vehicle?.isFavorite || false);
  const [error, setError] = useState('');

  // Sync isFavorite with vehicle.isFavorite when it changes
  useEffect(() => {
    setIsFavorite(vehicle?.isFavorite ?? false);
  }, [vehicle?.isFavorite]);

  const toggleFavorite = async () => {
    if (!session) {
      setError('Please sign in to add to favorites.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }

    try {
      const response = await fetch('/api/vehicles/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId: vehicle.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update favorite');
      setIsFavorite(data.isFavorite);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update favorite.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: vehicle.title,
      text: `Check out this ${vehicle.title} on Cabike!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('Failed to share. Link copied to clipboard.');
      await navigator.clipboard.writeText(shareData.url);
    }
  };

  // If vehicle is undefined or null, show an error state
  if (!vehicle) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
        <p className="text-red-600">Vehicle data not available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{formatPrice(vehicle.price)}</h2>
        <div className="flex gap-2">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={toggleFavorite}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
            onClick={handleShare}
          >
            <Share2 size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
            <Flag size={20} />
          </button>
        </div>
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <h1 className="text-xl font-semibold mb-4">{vehicle.title}</h1>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={16} className="text-gray-500" />
          <span>{vehicle.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={16} className="text-gray-500" />
          <span>{vehicle.year}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Gauge size={16} className="text-gray-500" />
          <span>{vehicle.mileage.toLocaleString()} km</span>
        </div>
        {vehicle.type === 'car' && (
          <div className="flex items-center gap-2 text-gray-700">
            <Fuel size={16} className="text-gray-500" />
            <span>{vehicle.fuelType}</span>
          </div>
        )}
        {vehicle.type === 'bike' && (
          <div className="flex items-center gap-2 text-gray-700">
            <span className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-gray-200 rounded text-gray-500">CC</span>
            <span>{vehicle.engineSize} cc</span>
          </div>
        )}
      </div>
      <div className="mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={24} />
          </div>
          <div>
            <div className="font-medium">{vehicle.sellerName}</div>
            <div className="text-sm text-gray-500">
              Member since {new Date(vehicle.sellerMemberSince).getFullYear()}
            </div>
          </div>
        </div>
        {vehicle.isVerified && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Shield size={16} />
            <span>Identity verified</span>
          </div>
        )}
      </div>
      <ContactForm vehicleId={vehicle.id} sellerPhone={vehicle.sellerPhone} />
    </div>
  );
}