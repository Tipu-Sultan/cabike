'use client';

import { createContext, useContext, useState } from 'react';

const SellFormContext = createContext();

export function SellFormProvider({ children }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: '',
    title: '',
    price: '',
    year: '',
    make: '',
    model: '',
    mileage: '',
    location: '',
    description: '',
    photos: [],
    fuelType: '',
    transmission: '',
    bodyType: '',
    engineSize: '',
    bikeType: '',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <SellFormContext.Provider value={{ step, formData, nextStep, prevStep, updateFormData }}>
      {children}
    </SellFormContext.Provider>
  );
}

export function useSellForm() {
  const context = useContext(SellFormContext);
  if (!context) {
    throw new Error('useSellForm must be used within a SellFormProvider');
  }
  return context;
}