'use client';

import { useSellForm } from '@/context/SellFormContext';

export default function VehicleDetailsStep() {
  const { formData, updateFormData, prevStep, nextStep } = useSellForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.price ||
      !formData.year ||
      !formData.make ||
      !formData.model ||
      !formData.mileage ||
      !formData.location ||
      !formData.description ||
      (formData.vehicleType === 'car' && (!formData.fuelType || !formData.transmission || !formData.bodyType)) ||
      (formData.vehicleType === 'bike' && (!formData.engineSize || !formData.bikeType))
    ) {
      alert('Please fill all required fields');
      return;
    }
    if (formData.description.length < 50) {
      alert('Description must be at least 50 characters');
      return;
    }
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        {formData.vehicleType === 'car' ? 'Car Details' : 'Motorcycle Details'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={formData.vehicleType === 'car' ? 'e.g., Toyota Camry 2.5 XLE' : 'e.g., Honda CBR650R ABS'}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => updateFormData({ price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.year}
              onChange={(e) => updateFormData({ year: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Year</option>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
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
              value={formData.make}
              onChange={(e) => updateFormData({ make: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={formData.vehicleType === 'car' ? 'e.g., Toyota' : 'e.g., Honda'}
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
              value={formData.model}
              onChange={(e) => updateFormData({ model: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={formData.vehicleType === 'car' ? 'e.g., Camry' : 'e.g., CBR650R'}
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
              value={formData.mileage}
              onChange={(e) => updateFormData({ mileage: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 25000"
              required
            />
          </div>
          {formData.vehicleType === 'car' && (
            <>
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  value={formData.fuelType}
                  onChange={(e) => updateFormData({ fuelType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.transmission}
                  onChange={(e) => updateFormData({ transmission: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.bodyType}
                  onChange={(e) => updateFormData({ bodyType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {formData.vehicleType === 'bike' && (
            <>
              <div>
                <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Size (cc)
                </label>
                <input
                  id="engineSize"
                  type="number"
                  value={formData.engineSize}
                  onChange={(e) => updateFormData({ engineSize: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.bikeType}
                  onChange={(e) => updateFormData({ bikeType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}