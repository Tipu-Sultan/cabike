'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Heart, Share2, Flag, MapPin, Calendar, Fuel, Gauge, 
  ChevronLeft, ChevronRight, ArrowLeft, MessageCircle,
  Phone, User, Shield, Check, ChevronDown, ChevronUp
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { allVehicles } from '@/lib/vehicle-data';
import { formatPrice } from '@/lib/format';
import VehicleCard from '@/components/vehicles/VehicleCard';

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  // Find the vehicle from mock data
  const vehicle = allVehicles.find(v => v.id === id);
  const relatedVehicles = allVehicles
    .filter(v => v.type === vehicle?.type && v.id !== vehicle?.id)
    .slice(0, 3);
  
  const [isFavorite, setIsFavorite] = useState(vehicle?.isFavorite || false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  
  // If vehicle not found
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/vehicles')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
          >
            Browse Vehicles
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Mock images for gallery
  const images = [
    vehicle.image,
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ];
  
  // Mock FAQs
  const faqs = [
    {
      id: 1,
      question: 'Is the price negotiable?',
      answer: 'Yes, I am open to reasonable offers. Please contact me to discuss.'
    },
    {
      id: 2,
      question: 'Are there any known issues with the vehicle?',
      answer: 'No major issues. The vehicle has been regularly serviced and well-maintained. All service records are available for review.'
    },
    {
      id: 3,
      question: 'Do you offer delivery?',
      answer: 'Local delivery may be possible within 20 miles for an additional fee. For longer distances, we can discuss arrangements.'
    },
    {
      id: 4,
      question: 'Can I take it for a test drive?',
      answer: 'Absolutely! You can schedule a test drive by contacting me. Please bring your driver\'s license.'
    }
  ];
  
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const selectImage = (index) => {
    setActiveImageIndex(index);
  };
  
  const toggleFaq = (id) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter(faqId => faqId !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} />
            <span>Back to results</span>
          </button>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Images and Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
                <div className="relative h-[400px]">
                  <img 
                    src={images[activeImageIndex]} 
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gallery Navigation */}
                  <button 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-700 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-700 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex p-2 gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <button 
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 rounded overflow-hidden ${
                        index === activeImageIndex ? 'ring-2 ring-blue-600' : ''
                      }`}
                      onClick={() => selectImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="flex border-b">
                  <button 
                    className={`px-6 py-4 font-medium text-sm ${
                      activeTab === 'overview' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium text-sm ${
                      activeTab === 'specifications' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('specifications')}
                  >
                    Specifications
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium text-sm ${
                      activeTab === 'faqs' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('faqs')}
                  >
                    FAQs
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Description</h3>
                      <p className="text-gray-700 mb-6">
                        {vehicle.type === 'car' 
                          ? `This ${vehicle.year} ${vehicle.title} is in excellent condition with only ${vehicle.mileage.toLocaleString()} kilometers on the odometer. It features a reliable ${vehicle.fuelType} engine with ${vehicle.transmission} transmission. The car has been well-maintained and regularly serviced at authorized dealers.`
                          : `This ${vehicle.year} ${vehicle.title} is in great condition with ${vehicle.mileage.toLocaleString()} kilometers. It features a powerful ${vehicle.engineSize}cc engine and has been well-maintained with regular servicing. The bike runs smoothly and is ready for its new owner.`
                        }
                      </p>
                      <p className="text-gray-700 mb-6">
                        {vehicle.type === 'car'
                          ? 'The interior is clean and smoke-free, with all electronics functioning properly. The exterior has no major dents or scratches. Recent maintenance includes new brakes, oil change, and tire rotation.'
                          : 'The bike starts instantly and runs without any issues. Recent maintenance includes oil change, new battery, and brake service. The tires are in good condition with plenty of tread left.'
                        }
                      </p>
                      <p className="text-gray-700">
                        I'm selling because I'm upgrading to a newer model. Price is slightly negotiable for serious buyers. Please contact me for more information or to schedule a viewing.
                      </p>
                      
                      {/* Features */}
                      <h3 className="text-xl font-semibold mt-8 mb-4">Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {vehicle.type === 'car' ? (
                          <>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Air Conditioning</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Power Steering</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Power Windows</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Anti-lock Braking System</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Airbags</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Bluetooth Connectivity</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Alloy Wheels</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Parking Sensors</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Disk Brakes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Electric Start</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Anti-lock Braking System</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>LED Headlights</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Digital Instrument Cluster</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span>Adjustable Suspension</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Specifications Tab */}
                  {activeTab === 'specifications' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Detailed Specifications</h3>
                      <div className="space-y-6">
                        {/* General Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">General Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Make</div>
                              <div className="font-medium">{vehicle.title.split(' ')[0]}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Model</div>
                              <div className="font-medium">{vehicle.title.split(' ').slice(1).join(' ')}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Year</div>
                              <div className="font-medium">{vehicle.year}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Body Type</div>
                              <div className="font-medium">{vehicle.type === 'car' ? 'Sedan' : 'Sport Bike'}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Color</div>
                              <div className="font-medium">Blue</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Condition</div>
                              <div className="font-medium">Used - Excellent</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Vehicle-specific specs */}
                        {vehicle.type === 'car' ? (
                          <>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Engine & Performance</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Fuel Type</div>
                                  <div className="font-medium">{vehicle.fuelType}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Transmission</div>
                                  <div className="font-medium">{vehicle.transmission}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Engine Capacity</div>
                                  <div className="font-medium">2.0L</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Power</div>
                                  <div className="font-medium">180 HP</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Length</div>
                                  <div className="font-medium">4,850 mm</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Width</div>
                                  <div className="font-medium">1,860 mm</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Height</div>
                                  <div className="font-medium">1,470 mm</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Weight</div>
                                  <div className="font-medium">1,650 kg</div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Engine & Performance</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Engine Size</div>
                                  <div className="font-medium">{vehicle.engineSize} cc</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Bike Type</div>
                                  <div className="font-medium">{vehicle.bikeType}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Power</div>
                                  <div className="font-medium">105 HP</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Torque</div>
                                  <div className="font-medium">85 Nm</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Length</div>
                                  <div className="font-medium">2,100 mm</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Width</div>
                                  <div className="font-medium">780 mm</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Seat Height</div>
                                  <div className="font-medium">810 mm</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-xs text-gray-500 mb-1">Weight</div>
                                  <div className="font-medium">195 kg</div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* FAQs Tab */}
                  {activeTab === 'faqs' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        {faqs.map((faq) => (
                          <div 
                            key={faq.id} 
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <button 
                              className="flex justify-between items-center w-full px-4 py-3 text-left font-medium"
                              onClick={() => toggleFaq(faq.id)}
                            >
                              <span>{faq.question}</span>
                              {expandedFaqs.includes(faq.id) ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>
                            {expandedFaqs.includes(faq.id) && (
                              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                                <p className="text-gray-700">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Related Vehicles */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Similar Vehicles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedVehicles.map((relatedVehicle) => (
                    <VehicleCard 
                      key={relatedVehicle.id} 
                      vehicle={relatedVehicle} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column: Price and Contact */}
            <div>
              {/* Price Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{formatPrice(vehicle.price)}</h2>
                  <div className="flex gap-2">
                    <button 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isFavorite 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={toggleFavorite}
                    >
                      <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
                      <Share2 size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
                      <Flag size={20} />
                    </button>
                  </div>
                </div>
                
                <h1 className="text-xl font-semibold mb-4">{vehicle.title}</h1>
                
                {/* Key Details */}
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
                
                {/* Seller Info */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div>
                      <div className="font-medium">{vehicle.sellerName}</div>
                      <div className="text-sm text-gray-500">Member since 2021</div>
                    </div>
                  </div>
                  
                  {vehicle.isVerified && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Shield size={16} />
                      <span>Identity verified</span>
                    </div>
                  )}
                </div>
                
                {/* Contact Options */}
                <div>
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-3"
                    onClick={() => setShowContactForm(!showContactForm)}
                  >
                    <MessageCircle size={18} />
                    Contact Seller
                  </button>
                  
                  {showContactForm && (
                    <div className="p-4 bg-gray-50 rounded-lg mb-4">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="4"
                          placeholder="I'm interested in this vehicle. Is it still available?"
                        ></textarea>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                        Send Message
                      </button>
                    </div>
                  )}
                  
                  <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Show Phone Number
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