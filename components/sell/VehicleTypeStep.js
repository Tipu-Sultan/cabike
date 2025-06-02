'use client';

import { Car, Bike } from 'lucide-react';
import { useSellForm } from '@/context/SellFormContext';

export default function VehicleTypeStep() {
  const { formData, updateFormData, nextStep } = useSellForm();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Choose Vehicle Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          className={`border rounded-xl p-6 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm transition-all ${
            formData.vehicleType === 'car' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => updateFormData({ vehicleType: 'car' })}
        >
          <Car
            size={48}
            className={formData.vehicleType === 'car' ? 'text-blue-600 mb-4' : 'text-gray-400 mb-4'}
          />
          <h3 className="text-lg font-medium mb-2">Car</h3>
          <p className="text-gray-600 text-sm">
            Sedans, SUVs, trucks, and other four-wheeled vehicles
          </p>
        </button>
        <button
          className={`border rounded-xl p-6 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-sm transition-all ${
            formData.vehicleType === 'bike' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => updateFormData({ vehicleType: 'bike' })}
        >
          <Bike
            size={48}
            className={formData.vehicleType === 'bike' ? 'text-blue-600 mb-4' : 'text-gray-400 mb-4'}
          />
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
          disabled={!formData.vehicleType}
        >
          Continue
        </button>
      </div>
    </div>
  );
}