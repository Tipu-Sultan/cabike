'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ photos, activeImageIndex, setActiveImageIndex }) {
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const selectImage = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
      <div className="relative h-[400px]">
        <img
          src={photos[activeImageIndex]?.imageUrl || photos[0]?.imageUrl}
          alt="Vehicle"
          className="w-full h-full object-cover"
        />
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
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
          {activeImageIndex + 1} / {photos.length}
        </div>
      </div>
      <div className="flex p-2 gap-2 overflow-x-auto">
        {photos.map((photo, index) => (
          <button
            key={index}
            className={`w-20 h-20 flex-shrink-0 rounded overflow-hidden ${index === activeImageIndex ? 'ring-2 ring-blue-600' : ''}`}
            onClick={() => selectImage(index)}
          >
            <img
              src={photo.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}