'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import { ChevronDown, Grid3X3, List, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function VehiclesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalVehicles: 0 });
  const [activeType, setActiveType] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch vehicles based on page
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/vehicles?page=${page}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch vehicles');
        setVehicles(data.vehicles);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.message || 'Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    const typeParam = searchParams.get('type') || 'all';
    setActiveType(typeParam);

    const filterVehicles = () => {
      let filtered = [...vehicles];

      if (typeParam !== 'all') {
        filtered = filtered.filter((vehicle) => vehicle.type === typeParam);
      }

      if (sortOption === 'recent') {
        filtered.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
      } else if (sortOption === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'year-new') {
        filtered.sort((a, b) => b.year - a.year);
      } else if (sortOption === 'year-old') {
        filtered.sort((a, b) => a.year - b.year);
      }

      setFilteredVehicles(filtered);
    };

    filterVehicles();
  }, [vehicles, searchParams, sortOption]);

  const handleTypeChange = (type) => {
    setActiveType(type);
    const newParams = new URLSearchParams(searchParams);
    if (type === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }
    newParams.set('page', '1');
    router.replace(`?${newParams.toString()}`);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Vehicles</h1>
            <p className="text-gray-600">
              Find your perfect ride from our selection of {pagination.totalVehicles} vehicles
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>
          )}

          {/* Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTypeChange('all')}
                >
                  All Vehicles
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeType === 'car' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTypeChange('car')}
                >
                  Cars Only
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeType === 'bike' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTypeChange('bike')}
                >
                  Bikes Only
                </button>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <button
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                  onClick={toggleFilters}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>

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

          {loading ? (
            <div className="flex flex-col md:flex-row gap-8">
              <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
                <VehicleFilters activeType={activeType} onClose={() => setShowFilters(false)} />
              </div>
              <div className="flex-1 flex items-center justify-center py-10">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-gray-600">Loading vehicles...</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
                <VehicleFilters activeType={activeType} onClose={() => setShowFilters(false)} />
              </div>
              <div className="flex-1">
                {filteredVehicles.length > 0 ? (
                  <div
                    className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}
                  >
                    {filteredVehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more results</p>
                  </div>
                )}

                {pagination.totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <div className="flex gap-2">
                      {[...Array(pagination.totalPages).keys()].slice(0, 5).map((page) => (
                        <button
                          key={page + 1}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            pagination.currentPage === page + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </button>
                      ))}
                      {pagination.totalPages > 5 && (
                        <span className="flex items-center px-2 text-gray-700">...</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}