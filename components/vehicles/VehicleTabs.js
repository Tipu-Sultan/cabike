'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export default function VehicleTabs({ vehicle, activeTab, setActiveTab }) {
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  const faqs = [
    { id: 1, question: 'Is the price negotiable?', answer: 'Yes, I am open to reasonable offers. Please contact me to discuss.' },
    { id: 2, question: 'Are there any known issues with the vehicle?', answer: 'No major issues. The vehicle has been regularly serviced and well-maintained.' },
    { id: 3, question: 'Do you offer delivery?', answer: 'Local delivery may be possible within 20 miles for an additional fee.' },
    { id: 4, question: 'Can I take it for a test drive?', answer: 'Absolutely! You can schedule a test drive by contacting me.' },
  ];

  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="flex border-b">
        {['overview', 'specifications', 'faqs'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-4 font-medium text-sm ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 mb-6">
              {vehicle.description || (vehicle.type === 'car'
                ? `This ${vehicle.year} ${vehicle.title} is in excellent condition with only ${vehicle.mileage.toLocaleString()} kilometers on the odometer. It features a reliable ${vehicle.fuelType} engine with ${vehicle.transmission} transmission. The car has been well-maintained and regularly serviced at authorized dealers.`
                : `This ${vehicle.year} ${vehicle.title} is in great condition with ${vehicle.mileage.toLocaleString()} kilometers. It features a powerful ${vehicle.engineSize}cc engine and has been well-maintained with regular servicing. The bike runs smoothly and is ready for its new owner.`)}
            </p>
            <p className="text-gray-700 mb-6">
              {vehicle.type === 'car'
                ? 'The interior is clean and smoke-free, with all electronics functioning properly. The exterior has no major dents or scratches. Recent maintenance includes new brakes, oil change, and tire rotation.'
                : 'The bike starts instantly and runs without any issues. Recent maintenance includes oil change, new battery, and brake service. The tires are in good condition with plenty of tread left.'}
            </p>
            <p className="text-gray-700">
              I'm selling because I'm upgrading to a newer model. Price is slightly negotiable for serious buyers. Please contact me for more information or to schedule a viewing.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.type === 'car' ? (
                <>
                  {['Air Conditioning', 'Power Steering', 'Power Windows', 'Anti-lock Braking System', 'Airbags', 'Bluetooth Connectivity', 'Alloy Wheels', 'Parking Sensors'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {['Disk Brakes', 'Electric Start', 'Anti-lock Braking System', 'LED Headlights', 'Digital Instrument Cluster', 'Adjustable Suspension'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Detailed Specifications</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">General Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Make', value: vehicle.title.split(' ')[0] },
                    { label: 'Model', value: vehicle.title.split(' ').slice(1).join(' ') },
                    { label: 'Year', value: vehicle.year },
                    { label: 'Body Type', value: vehicle.type === 'car' ? vehicle.carDetails?.bodyType || 'Sedan' : vehicle.bikeDetails?.bikeType || 'Sport Bike' },
                    { label: 'Color', value: 'Blue' },
                    { label: 'Condition', value: 'Used - Excellent' },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              {vehicle.type === 'car' ? (
                <>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Engine & Performance</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Fuel Type', value: vehicle.fuelType },
                        { label: 'Transmission', value: vehicle.transmission },
                        { label: 'Engine Capacity', value: '2.0L' },
                        { label: 'Power', value: '180 HP' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Length', value: '4,850 mm' },
                        { label: 'Width', value: '1,860 mm' },
                        { label: 'Height', value: '1,470 mm' },
                        { label: 'Weight', value: '1,650 kg' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Engine & Performance</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Engine Size', value: `${vehicle.engineSize} cc` },
                        { label: 'Bike Type', value: vehicle.bikeType },
                        { label: 'Power', value: '105 HP' },
                        { label: 'Torque', value: '85 Nm' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Length', value: '2,100 mm' },
                        { label: 'Width', value: '780 mm' },
                        { label: 'Seat Height', value: '810 mm' },
                        { label: 'Weight', value: '195 kg' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {activeTab === 'faqs' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full px-4 py-3 text-left font-medium"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span>{faq.question}</span>
                    {expandedFaqs.includes(faq.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
  );
}