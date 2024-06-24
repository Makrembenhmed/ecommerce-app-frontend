import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ProdCollection({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isReversing, setIsReversing] = useState(false);
  const slideIntervalRef = useRef(null);

  const totalSlides = products.length;
  const visibleSlides = 3;

  const resetTransition = () => {
    setIsTransitioning(false);
    setTimeout(() => setIsTransitioning(true), 0);
  };

  const updateSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setIsReversing(!isReversing);
      setCurrentIndex(1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex === totalSlides - 1) {
      setIsReversing(!isReversing);
      setCurrentIndex(totalSlides - 2);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      isReversing ? prevSlide() : nextSlide();
    }, 3000);

    return () => clearInterval(slideIntervalRef.current);
  }, [currentIndex, isReversing]);

  return (
    <div className="relative w-full mt-6">
      <div
        id="carouselExampleCaptions"
        className="relative mx-auto max-w-6xl rounded-lg shadow-lg overflow-hidden group"
      >
        <div className="relative overflow-hidden h-64">
          <div
            className={`absolute inset-0 flex transition-transform duration-700 ${isTransitioning ? '' : 'transition-none'}`}
            style={{ transform: `translateX(-${(currentIndex * 100) / visibleSlides}%)` }}
          >
            {products.concat(products.slice(0, visibleSlides)).map((product, index) => (
              <div key={index} className="flex-shrink-0 mx-2 enhanced-border" style={{ width: `calc(100% / ${visibleSlides} - 1rem)` }}>
                <Link href={`/products/${product._id}`}>
                  <img src={product.images[0]} className="product-image" alt={`Slide ${index + 1}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full bg-gray-700 focus:outline-none ${currentIndex === index ? 'opacity-100' : 'opacity-50'}`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => updateSlide(index)}
            ></button>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-100 transition duration-300 opacity-0 group-hover:opacity-100"
          onClick={prevSlide}
        >
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-100 transition duration-300 opacity-0 group-hover:opacity-100"
          onClick={nextSlide}
        >
          <span aria-hidden="true">›</span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
