'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Bike, Upload, X, Info, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SellPage() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState('');
  const [step, setStep] = useState(1);
  
  // Vehicle Details Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  // Car-specific form state
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [bodyType, setBodyType] = useState('');
  
  // Bike-specific form state
  const [engineSize, setEngineSize] = useState('');
  const [bikeType, setBikeType] = useState('');
  
  // Photos
  const [photos, setPhotos] = useState([]);
  
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for the selected images
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setPhotos([...photos, ...newPhotos]);
  };
  
  const removePhoto = (index) => {
    const newPhotos = [...photos];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newPhotos[index].preview);
    
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    router.push('/sell/confirmation');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Sell Your Vehicle</h1>
            <p className="text-gray-600 mb-8">
              List your car or bike and connect with thousands of buyers
            </p>
            
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } font-medium`}>
                  1
                </div>
                <div className={`h-1 flex-1 mx-2 ${
                  step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } font-medium`}>
                  2
                </div>
                <div className={`h-1 flex-1 mx-2 ${
                  step >= 3 ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } font-medium`}>
                  3
                </div>
                <div className={`h-1 flex-1 mx-2 ${
                  step >= 4 ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } font-medium`}>
                  4
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <div className="text-center w-10">Type</div>
                <div className="text-center">Details</div>
                <div className="text-center">Photos</div>
                <div className="text-center w-10">Review</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Step 1: Choose Vehicle Type */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Choose Vehicle Type</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button 
                      className={`border rounded-xl p-6 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm transition-all ${
                        vehicleType === 'car' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setVehicleType('car')}
                    >
                      <Car size={48} className={vehicleType === 'car' ? 'text-blue-600 mb-4' : 'text-gray-400 mb-4'} />
                      <h3 className="text-lg font-medium mb-2">Car</h3>
                      <p className="text-gray-600 text-sm">
                        Sedans, SUVs, trucks, and other four-wheeled vehicles
                      </p>
                    </button>
                    
                    <button 
                      className={`border rounded-xl p-6 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm transition-all ${
                        vehicleType === 'bike' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setVehicleType('bike')}
                    >
                      <Bike size={48} className={vehicleType === 'bike' ? 'text-blue-600 mb-4' : 'text-gray-400 mb-4'} />
                      <h3 className="text-lg font-medium mb-2">Motorcycle</h3>
                      <p className="text-gray-600 text-sm">
                        Sport bikes, cruisers, touring, and off-road motorcycles
                      </p>
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
                      onClick={nextStep}
                      disabled={!vehicleType}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Vehicle Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {vehicleType === 'car' ? 'Car Details' : 'Motorcycle Details'}
                  </h2>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          id="title"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={vehicleType === 'car' ? 'e.g., Toyota Camry 2.5 XLE' : 'e.g., Honda CBR650R ABS'}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          id="price"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 25000"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <select
                          id="year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                          Make
                        </label>
                        <input
                          id="make"
                          type="text"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={vehicleType === 'car' ? 'e.g., Toyota' : 'e.g., Honda'}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                          Model
                        </label>
                        <input
                          id="model"
                          type="text"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={vehicleType === 'car' ? 'e.g., Camry' : 'e.g., CBR650R'}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                          Mileage (km)
                        </label>
                        <input
                          id="mileage"
                          type="number"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 25000"
                          required
                        />
                      </div>
                      
                      {/* Car-specific fields */}
                      {vehicleType === 'car' && (
                        <>
                          <div>
                            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                              Fuel Type
                            </label>
                            <select
                              id="fuelType"
                              value={fuelType}
                              onChange={(e) => setFuelType(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select Fuel Type</option>
                              <option value="Gasoline">Gasoline</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Electric">Electric</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                              Transmission
                            </label>
                            <select
                              id="transmission"
                              value={transmission}
                              onChange={(e) => setTransmission(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select Transmission</option>
                              <option value="Automatic">Automatic</option>
                              <option value="Manual">Manual</option>
                              <option value="CVT">CVT</option>
                              <option value="Semi-Automatic">Semi-Automatic</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">
                              Body Type
                            </label>
                            <select
                              id="bodyType"
                              value={bodyType}
                              onChange={(e) => setBodyType(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select Body Type</option>
                              <option value="Sedan">Sedan</option>
                              <option value="SUV">SUV</option>
                              <option value="Hatchback">Hatchback</option>
                              <option value="Coupe">Coupe</option>
                              <option value="Convertible">Convertible</option>
                              <option value="Wagon">Wagon</option>
                              <option value="Van">Van</option>
                            </select>
                          </div>
                        </>
                      )}
                      
                      {/* Bike-specific fields */}
                      {vehicleType === 'bike' && (
                        <>
                          <div>
                            <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700 mb-1">
                              Engine Size (cc)
                            </label>
                            <input
                              id="engineSize"
                              type="number"
                              value={engineSize}
                              onChange={(e) => setEngineSize(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., 650"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="bikeType" className="block text-sm font-medium text-gray-700 mb-1">
                              Bike Type
                            </label>
                            <select
                              id="bikeType"
                              value={bikeType}
                              onChange={(e) => setBikeType(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select Bike Type</option>
                              <option value="Sport">Sport</option>
                              <option value="Cruiser">Cruiser</option>
                              <option value="Touring">Touring</option>
                              <option value="Standard">Standard</option>
                              <option value="Dual Sport">Dual Sport</option>
                              <option value="Off-Road">Off-Road</option>
                              <option value="Scooter">Scooter</option>
                            </select>
                          </div>
                        </>
                      )}
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          id="location"
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., San Francisco, CA"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="6"
                        placeholder="Describe your vehicle's condition, features, history, etc."
                        required
                      ></textarea>
                      <p className="text-gray-500 text-sm mt-1">
                        Minimum 50 characters. Be detailed and honest about the vehicle's condition.
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-6 py-2 rounded-lg"
                        onClick={prevStep}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
                        onClick={nextStep}
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 3: Upload Photos */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Upload Photos</h2>
                  <p className="text-gray-600 mb-6">
                    Add clear, high-quality photos of your vehicle. Listings with good photos sell faster!
                  </p>
                  
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="photos"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <label 
                        htmlFor="photos"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload size={48} className="text-gray-400 mb-4" />
                        <p className="text-gray-700 font-medium mb-1">
                          Drag photos here or click to upload
                        </p>
                        <p className="text-gray-500 text-sm">
                          Upload up to 12 photos (JPEG or PNG format)
                        </p>
                      </label>
                    </div>
                  </div>
                  
                  {photos.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Uploaded Photos ({photos.length}/12)</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={photo.preview} 
                              alt={`Vehicle photo ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removePhoto(index)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
                    <div className="text-blue-600 flex-shrink-0">
                      <Info size={20} />
                    </div>
                    <div className="text-sm text-blue-800">
                      <strong>Photo tips:</strong> Include exterior (all sides), interior, dashboard, and engine bay. 
                      Make sure your photos are well-lit and clearly show the condition of your vehicle.
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-6 py-2 rounded-lg"
                      onClick={prevStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
                      onClick={nextStep}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Review Listing */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Review Your Listing</h2>
                  
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Listing Details</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-500">Title</div>
                            <div className="font-medium">{title || 'Not provided'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Price</div>
                            <div className="font-medium">${price || '0'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Year</div>
                            <div className="font-medium">{year || 'Not provided'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Make & Model</div>
                            <div className="font-medium">{make || 'Not provided'} {model || ''}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Mileage</div>
                            <div className="font-medium">{mileage || '0'} km</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-medium">{location || 'Not provided'}</div>
                          </div>
                          
                          {/* Vehicle-specific details */}
                          {vehicleType === 'car' && (
                            <>
                              <div>
                                <div className="text-sm text-gray-500">Fuel Type</div>
                                <div className="font-medium">{fuelType || 'Not provided'}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Transmission</div>
                                <div className="font-medium">{transmission || 'Not provided'}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Body Type</div>
                                <div className="font-medium">{bodyType || 'Not provided'}</div>
                              </div>
                            </>
                          )}
                          
                          {vehicleType === 'bike' && (
                            <>
                              <div>
                                <div className="text-sm text-gray-500">Engine Size</div>
                                <div className="font-medium">{engineSize || '0'} cc</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Bike Type</div>
                                <div className="font-medium">{bikeType || 'Not provided'}</div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-4">Description</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {description || 'No description provided.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-lg mb-4">Photos ({photos.length})</h3>
                      {photos.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {photos.map((photo, index) => (
                            <div key={index}>
                              <img 
                                src={photo.preview} 
                                alt={`Vehicle photo ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No photos uploaded.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex gap-3">
                    <div className="text-green-600 flex-shrink-0">
                      <Check size={20} />
                    </div>
                    <div className="text-sm text-green-800">
                      <strong>Looking good!</strong> Your listing is ready to be published. 
                      Once submitted, it will be reviewed and should go live within 24 hours.
                    </div>
                    {
                      !title ? (<div className="text-sm text-red-800">
                      <strong>Looking bad!</strong> Your listing is not ready to be published. please check the details and make sure all required fields are filled out.
                    </div>):(
                      <div className="text-sm text-green-800">
                      <strong>Looking good!</strong> Your listing is ready to be published. 
                      Once submitted, it will be reviewed and should go live within 24 hours.
                    </div>
                    )
                    }
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-6 py-2 rounded-lg"
                      onClick={prevStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
                      onClick={handleSubmit}
                    >
                      Publish Listing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}