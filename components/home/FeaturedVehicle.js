'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, CheckCircle, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';

export default function FeaturedVehicle({ vehicle }) {
  const [isFavorite, setIsFavorite] = useState(vehicle.isFavorite || false);
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 group">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={vehicle.image} 
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Favorite button */}
          <button 
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-gray-600 hover:bg-white"
            )}
            onClick={toggleFavorite}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          
          {/* Featured badge */}
          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Star size={12} fill="currentColor" /> Featured
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Title and price */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-xl">{vehicle.title}</h3>
            <div className="text-xl font-bold text-blue-600">
              {formatPrice(vehicle.price)}
            </div>
          </div>
          
          {/* Location */}
          <p className="text-gray-500 mb-4">
            {vehicle.location}
          </p>
          
          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Year</div>
              <div className="font-medium">{vehicle.year}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">
                {vehicle.type === 'car' ? 'Fuel Type' : 'Engine Size'}
              </div>
              <div className="font-medium">
                {vehicle.type === 'car' ? vehicle.fuelType : `${vehicle.engineSize} cc`}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Mileage</div>
              <div className="font-medium">{vehicle.mileage.toLocaleString()} km</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">
                {vehicle.type === 'car' ? 'Transmission' : 'Type'}
              </div>
              <div className="font-medium">
                {vehicle.type === 'car' ? vehicle.transmission : vehicle.bikeType}
              </div>
            </div>
          </div>
          
          {/* Seller and verification */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm text-gray-600">{vehicle.sellerName}</span>
            </div>
            {vehicle.isVerified && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle size={16} /> Verified
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}