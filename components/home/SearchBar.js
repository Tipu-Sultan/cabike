'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (vehicleType !== 'all') {
      params.append('type', vehicleType);
    }
    
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    
    if (priceRange) {
      params.append('price', priceRange);
    }
    
    if (location) {
      params.append('location', location);
    }
    
    router.push(`/vehicles?${params.toString()}`);
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-2 w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        {/* Vehicle Type */}
        <div className="relative flex-1 min-w-[160px]">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          >
            <option value="all">All Vehicles</option>
            <option value="car">Cars Only</option>
            <option value="bike">Bikes Only</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={18} />
          </div>
        </div>
        
        {/* Search Term */}
        <div className="flex-[2]">
          <input
            type="text"
            placeholder="Search by make, model, or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Price Range */}
        <div className="relative flex-1 min-w-[140px]">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Price</option>
            <option value="0-5000">Under $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000-20000">$10,000 - $20,000</option>
            <option value="20000-30000">$20,000 - $30,000</option>
            <option value="30000-50000">$30,000 - $50,000</option>
            <option value="50000-9999999">Over $50,000</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={18} />
          </div>
        </div>
        
        {/* Location */}
        <div className="flex-1 min-w-[140px]">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Search Button */}
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg flex items-center justify-center gap-2 min-w-[120px]"
        >
          <Search size={20} />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}