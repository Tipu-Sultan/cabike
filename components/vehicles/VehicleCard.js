'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Calendar, Fuel, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';

export default function VehicleCard({ vehicle }) {
  const [isFavorite, setIsFavorite] = useState(vehicle.isFavorite || false);
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
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
          
          {/* Type label */}
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
            {vehicle.type === 'car' ? 'Car' : 'Bike'}
          </div>
          
          {/* Price */}
          <div className="absolute bottom-3 right-3 bg-blue-600 text-white font-bold px-3 py-1 rounded">
            {formatPrice(vehicle.price)}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{vehicle.title}</h3>
          
          {/* Specs */}
          <div className="flex flex-wrap gap-y-2 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1 w-1/2">
              <MapPin size={14} />
              <span className="truncate">{vehicle.location}</span>
            </div>
            <div className="flex items-center gap-1 w-1/2">
              <Calendar size={14} />
              <span>{vehicle.year}</span>
            </div>
            
            {vehicle.type === 'car' && (
              <>
                <div className="flex items-center gap-1 w-1/2">
                  <Fuel size={14} />
                  <span>{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center gap-1 w-1/2">
                  <Gauge size={14} />
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                </div>
              </>
            )}
            
            {vehicle.type === 'bike' && (
              <>
                <div className="flex items-center gap-1 w-1/2">
                  <span className="font-medium text-xs">CC</span>
                  <span>{vehicle.engineSize} cc</span>
                </div>
                <div className="flex items-center gap-1 w-1/2">
                  <Gauge size={14} />
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                </div>
              </>
            )}
          </div>
          
          {/* Date and verification */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-xs">
            <span className="text-gray-500">
              Listed {vehicle.listedDate}
            </span>
            {vehicle.isVerified && (
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}