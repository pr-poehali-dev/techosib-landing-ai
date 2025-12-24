import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  inStock?: boolean;
}

export default function ImageCarousel({ images, alt, inStock }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg overflow-hidden flex items-center justify-center">
        <div className="text-center p-6">
          <Icon name="Package" size={64} className="text-primary/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{alt}</p>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
        <img 
          src={images[0]} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <Icon name="ImageOff" size={48} className="text-muted-foreground/50" />
          </div>
        )}
        {inStock !== undefined && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
            inStock 
              ? 'bg-green-500 text-white' 
              : 'bg-orange-500 text-white'
          }`}>
            {inStock ? 'В наличии' : 'Под заказ'}
          </div>
        )}
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden group">
      <img 
        src={images[currentIndex]} 
        alt={`${alt} - ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-all duration-300"
        onError={() => setImageError(true)}
      />
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <Icon name="ImageOff" size={48} className="text-muted-foreground/50" />
        </div>
      )}
      
      {inStock !== undefined && (
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
          inStock 
            ? 'bg-green-500 text-white' 
            : 'bg-orange-500 text-white'
        }`}>
          {inStock ? 'В наличии' : 'Под заказ'}
        </div>
      )}

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon name="ChevronRight" size={24} />
          </Button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}