'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function VehicleFilters({ activeType, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    year: true,
    make: true,
    features: false,
    condition: false,
    location: false
  });
  
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [yearRange, setYearRange] = useState([2010, 2023]);
  
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };
  
  const handleYearChange = (e, index) => {
    const newRange = [...yearRange];
    newRange[index] = parseInt(e.target.value);
    setYearRange(newRange);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Price Range */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium mb-3"
          onClick={() => toggleSection('price')}
        >
          <span>Price Range</span>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.price && (
          <div>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
            <div className="relative mb-4 px-2">
              <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 transform -translate-y-1/2 rounded"></div>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                style={{ zIndex: 10 }}
              />
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                style={{ zIndex: 10 }}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1 block">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1 block">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Year Range */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium mb-3"
          onClick={() => toggleSection('year')}
        >
          <span>Year</span>
          {expandedSections.year ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.year && (
          <div>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
            <div className="relative mb-4 px-2">
              <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 transform -translate-y-1/2 rounded"></div>
              <input 
                type="range" 
                min="2000" 
                max="2023" 
                value={yearRange[0]}
                onChange={(e) => handleYearChange(e, 0)}
                className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                style={{ zIndex: 10 }}
              />
              <input 
                type="range" 
                min="2000" 
                max="2023" 
                value={yearRange[1]}
                onChange={(e) => handleYearChange(e, 1)}
                className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                style={{ zIndex: 10 }}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1 block">From</label>
                <select
                  value={yearRange[0]}
                  onChange={(e) => handleYearChange(e, 0)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  {Array.from({ length: 24 }, (_, i) => 2000 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1 block">To</label>
                <select
                  value={yearRange[1]}
                  onChange={(e) => handleYearChange(e, 1)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  {Array.from({ length: 24 }, (_, i) => 2000 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Make & Model */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium mb-3"
          onClick={() => toggleSection('make')}
        >
          <span>Make & Model</span>
          {expandedSections.make ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.make && (
          <div>
            {activeType === 'all' || activeType === 'car' ? (
              <div className="mb-4">
                <label className="text-xs text-gray-600 mb-1 block">Car Make</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option value="">Any Make</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="ford">Ford</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="audi">Audi</option>
                  <option value="tesla">Tesla</option>
                </select>
              </div>
            ) : null}
            
            {activeType === 'all' || activeType === 'bike' ? (
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Bike Make</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option value="">Any Make</option>
                  <option value="honda">Honda</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="kawasaki">Kawasaki</option>
                  <option value="suzuki">Suzuki</option>
                  <option value="harley">Harley-Davidson</option>
                  <option value="ducati">Ducati</option>
                  <option value="triumph">Triumph</option>
                </select>
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      {/* Features */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium mb-3"
          onClick={() => toggleSection('features')}
        >
          <span>Features</span>
          {expandedSections.features ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.features && (
          <div className="space-y-2">
            {activeType === 'all' || activeType === 'car' ? (
              <>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-ac" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-ac\" className="ml-2 text-sm text-gray-700">
                    Air Conditioning
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-nav" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-nav" className="ml-2 text-sm text-gray-700">
                    Navigation System
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-leather" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-leather" className="ml-2 text-sm text-gray-700">
                    Leather Seats
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-sunroof" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-sunroof" className="ml-2 text-sm text-gray-700">
                    Sunroof
                  </label>
                </div>
              </>
            ) : null}
            
            {activeType === 'all' || activeType === 'bike' ? (
              <>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-abs" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-abs" className="ml-2 text-sm text-gray-700">
                    ABS
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-elec-start" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-elec-start" className="ml-2 text-sm text-gray-700">
                    Electric Start
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="feature-disk-brake" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feature-disk-brake" className="ml-2 text-sm text-gray-700">
                    Disk Brakes
                  </label>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
      
      {/* Apply Filters Button */}
      <div className="flex gap-2">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Apply Filters
        </button>
        <button 
          className="flex-shrink-0 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}