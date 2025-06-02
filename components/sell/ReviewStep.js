'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useSellForm } from '@/context/SellFormContext';
import { useSession } from 'next-auth/react';

export default function ReviewStep() {
  const { formData, prevStep } = useSellForm();
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValid = () =>
    formData.title &&
    formData.price &&
    formData.year &&
    formData.make &&
    formData.model &&
    formData.mileage &&
    formData.location &&
    formData.description &&
    (formData.vehicleType === 'car'
      ? formData.fuelType && formData.transmission && formData.bodyType
      : formData.engineSize && formData.bikeType);

  const handleSubmit = async () => {
    if (!session) {
      setError('Please log in to publish a listing');
      return;
    }
    if (!isValid()) {
      setError('Please complete all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sellerId: session.user.id,
          photos: formData.photos.map((photo) => ({
            publicId: photo.publicId,
            imageUrl: photo.imageUrl,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create listing');
      router.push('/sell/confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Your Listing</h2>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>
      )}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-4">Listing Details</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Title</div>
                <div className="font-medium">{formData.title || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-medium">${formData.price || '0'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Year</div>
                <div className="font-medium">{formData.year || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Make & Model</div>
                <div className="font-medium">
                  {formData.make || 'Not provided'} {formData.model || ''}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Mileage</div>
                <div className="font-medium">{formData.mileage || '0'} km</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{formData.location || 'Not provided'}</div>
              </div>
              {formData.vehicleType === 'car' && (
                <>
                  <div>
                    <div className="text-sm text-gray-500">Fuel Type</div>
                    <div className="font-medium">{formData.fuelType || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Transmission</div>
                    <div className="font-medium">{formData.transmission || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Body Type</div>
                    <div className="font-medium">{formData.bodyType || 'Not provided'}</div>
                  </div>
                </>
              )}
              {formData.vehicleType === 'bike' && (
                <>
                  <div>
                    <div className="text-sm text-gray-500">Engine Size</div>
                    <div className="font-medium">{formData.engineSize || '0'} cc</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bike Type</div>
                    <div className="font-medium">{formData.bikeType || 'Not provided'}</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {formData.description || 'No description provided.'}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium text-lg mb-4">Photos ({formData.photos.length})</h3>
          {formData.photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.photos.map((photo, index) => (
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
        {!isValid() ? (
          <>
            <div className="text-red-600 flex-shrink-0">
              <Check size={20} />
            </div>
            <div className="text-sm text-red-800">
              <strong>Looking bad!</strong> Your listing is not ready to be published. Please check the details and make sure all required fields are filled out.
            </div>
          </>
        ) : (
          <>
            <div className="text-green-600 flex-shrink-0">
              <Check size={20} />
            </div>
            <div className="text-sm text-green-800">
              <strong>Looking good!</strong> Your listing is ready to be published. Once submitted, it will be reviewed and should go live within 24 hours.
            </div>
          </>
        )}
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
          disabled={submitting || !isValid()}
        >
          {submitting ? 'Publishing...' : 'Publish Listing'}
        </button>
      </div>
    </div>
  );
}