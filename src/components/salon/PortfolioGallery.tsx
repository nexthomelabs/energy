import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioImage {
  id: string;
  url: string;
  category: string;
  description: string;
}

interface PortfolioGalleryProps {
  images: PortfolioImage[];
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(images.map(img => img.category))];
  
  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: PortfolioImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2">
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            layoutId={image.id}
            className="aspect-square relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(image)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-white text-sm">{image.description}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={handleClose}
          >
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={handleClose}
            >
              <X size={24} />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight size={32} />
            </button>

            <div className="max-w-3xl max-h-[80vh] p-4" onClick={e => e.stopPropagation()}>
              <motion.img
                layoutId={selectedImage.id}
                src={selectedImage.url}
                alt={selectedImage.description}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="mt-4 text-white text-center">
                <p className="text-lg">{selectedImage.description}</p>
                <p className="text-sm text-neutral-400 mt-1">{selectedImage.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioGallery;
