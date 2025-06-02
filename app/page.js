'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Car, Bike, Search, TrendingUp, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeaturedVehicle from '@/components/home/FeaturedVehicle';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { featuredVehicles, recentVehicles } from '@/lib/vehicle-data';
import SearchBar from '@/components/home/SearchBar';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredVehicles = activeTab === 'all' 
    ? recentVehicles 
    : recentVehicles.filter(vehicle => vehicle.type === activeTab);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600")',
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Ride
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover amazing deals on cars and bikes from trusted sellers
            </p>
            
            <SearchBar />

            <div className="flex gap-4 mt-6">
              <Link href="/vehicles?type=car" className="bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                <Car size={20} />
                Browse Cars
              </Link>
              <Link href="/vehicles?type=bike" className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 backdrop-blur transition-all">
                <Bike size={20} />
                Browse Bikes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Vehicles</h2>
            <Link href="/vehicles" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map(vehicle => (
              <FeaturedVehicle key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Recent Listings</h2>
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'car' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('car')}
              >
                Cars
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'bike' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('bike')}
              >
                Bikes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/vehicles" className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              View All Listings <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Testimonials */}
      <Testimonials />

      <Footer />
    </main>
  );
}