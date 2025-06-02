'use client';

import { useState } from 'react';
import { Upload, X, Info } from 'lucide-react';
import { useSellForm } from '@/context/SellFormContext';

export default function PhotoUploadStep() {
  const { formData, updateFormData, prevStep, nextStep } = useSellForm();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 12) {
      setError('Maximum 12 photos allowed');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const newPhotos = [];
      for (const file of files) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Upload failed');
        newPhotos.push({
          publicId: result.publicId,
          imageUrl: result.imageUrl,
          preview: URL.createObjectURL(file),
        });
      }
      updateFormData({ photos: [...formData.photos, ...newPhotos] });
    } catch (err) {
      setError('Failed to upload photos');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = async (index) => {
    const photo = formData.photos[index];
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: photo.publicId }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Delete failed');
      URL.revokeObjectURL(photo.preview);
      const newPhotos = [...formData.photos];
      newPhotos.splice(index, 1);
      updateFormData({ photos: newPhotos });
    } catch (err) {
      setError('Failed to delete photo');
    }
  };

  const handleNextStep = () => {
    if (formData.photos.length === 0) {
      setError('Please upload at least one photo');
      return;
    }
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Upload Photos</h2>
      <p className="text-gray-600 mb-6">
        Add clear, high-quality photos of your vehicle. Listings with good photos sell faster!
      </p>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>
      )}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
            disabled={uploading}
          />
          <label
            htmlFor="photos"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-700 font-medium mb-1">
              {uploading ? 'Uploading...' : 'Drag photos here or click to upload'}
            </p>
            <p className="text-gray-500 text-sm">
              Upload up to 12 photos (JPEG or PNG format)
            </p>
          </label>
        </div>
      </div>
      {formData.photos.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Uploaded Photos ({formData.photos.length}/12)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.photos.map((photo, index) => (
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
          <strong>Photo tips:</strong> Include exterior (all sides), interior, dashboard, and engine bay. Make sure your photos are well-lit and clearly show the condition of your vehicle.
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
          onClick={handleNextStep}
          disabled={uploading}
        >
          Continue
        </button>
      </div>
    </div>
  );
}