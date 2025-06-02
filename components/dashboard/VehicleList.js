'use client';

import { Trash2, Eye, Heart } from 'lucide-react';
import Link from 'next/link';

export default function VehicleList({ title, vehicles, emptyMessage, type }) {
  const handleDelete = async (vehicleId) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to delete vehicle');
      // Refresh the page or update state
      window.location.reload();
    } catch (error) {
      alert('Error deleting vehicle');
    }
  };

  const handleRemoveFavorite = async (vehicleId) => {
    try {
      const response = await fetch('/api/vehicles/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId }),
      });
      if (!response.ok) throw new Error('Failed to remove favorite');
      window.location.reload();
    } catch (error) {
      alert('Error removing favorite');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {vehicles.length === 0 ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle?._id} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
              <img
                src={vehicle?.photos[0]?.imageUrl || '/placeholder.png'}
                alt={vehicle.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{vehicle.title}</h3>
                <p className="text-gray-600">₹{vehicle.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 capitalize">{vehicle.vehicleType}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/vehicles/${vehicle._id}`}
                  className="text-blue-600 hover:text-blue-700"
                  title="View"
                >
                  <Eye size={20} />
                </Link>
                {type === 'listings' && (
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                {type === 'favorites' && (
                  <button
                    onClick={() => handleRemoveFavorite(vehicle._id)}
                    className="text-red-600 hover:text-red-700"
                    title="Remove Favorite"
                  >
                    <Heart size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}