'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import { allVehicles } from '@/lib/vehicle-data';
import { ChevronDown, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

export default function VehiclesPage() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [activeType, setActiveType] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Initialize vehicles
    setVehicles(allVehicles);
    
    // Get initial filter from URL params
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setActiveType(typeParam);
    }
    
    // Apply initial filters
    filterVehicles(typeParam || 'all', sortOption);
  }, [searchParams]);

  const filterVehicles = (type, sort) => {
    let filtered = [...vehicles];
    
    // Filter by type
    if (type !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.type === type);
    }
    
    // Sort vehicles
    if (sort === 'recent') {
      filtered.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
    } else if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'year-new') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sort === 'year-old') {
      filtered.sort((a, b) => a.year - b.year);
    }
    
    setFilteredVehicles(filtered);
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    filterVehicles(type, sortOption);
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    filterVehicles(activeType, newSortOption);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Vehicles</h1>
            <p className="text-gray-600">
              Find your perfect ride from our selection of {vehicles.length} vehicles
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Type filter buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeType === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTypeChange('all')}
                >
                  All Vehicles
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeType === 'car' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTypeChange('car')}
                >
                  Cars Only
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeType === 'bike' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTypeChange('bike')}
                >
                  Bikes Only
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                {/* Filter toggle (mobile) */}
                <button 
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                  onClick={toggleFilters}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>
                
                {/* View mode switcher */}
                <div className="bg-gray-100 rounded-lg p-1 hidden md:flex">
                  <button 
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 size={18} className="text-gray-700" />
                  </button>
                  <button 
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} className="text-gray-700" />
                  </button>
                </div>
                
                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="pl-4 pr-10 py-2 bg-gray-100 rounded-lg appearance-none focus:outline-none text-gray-700"
                  >
                    <option value="recent">Recently Listed</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="year-new">Year: Newest First</option>
                    <option value="year-old">Year: Oldest First</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
              <VehicleFilters 
                activeType={activeType}
                onClose={() => setShowFilters(false)}
              />
            </div>
            
            {/* Vehicle Grid */}
            <div className="flex-1">
              {filteredVehicles.length > 0 ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard 
                      key={vehicle.id} 
                      vehicle={vehicle} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
              
              {/* Pagination (simplified) */}
              <div className="mt-10 flex justify-center">
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100">
                    3
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100">
                    ...
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}