import { useState } from 'react';
import image2 from '../assets/carousel-2.jpg';
import image3 from '../assets/carousel-3.jpg';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const slides = [
    {
      id: 0,
      image: image2,
      alt: 'Slide 2',
    },
    {
      id: 1,
      image: image3,
      alt: 'Slide 3',
    },
  ];

  return (
    <div className=""> {/* Added margin here */}
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        <div className="relative h-96  overflow-hidden rounded-lg md:h-[530px] w-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`transform ${currentSlide === slide.id ? 'translate-x-0' : 'translate-x-full'
                } duration-700 ease-in-out`}
              data-carousel-item
            >
              <img
                src={slide.image}
                className="absolute top-0 left-0 block object-cover w-full h-full"
                alt={slide.alt}
              />
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex space-x-3 transform -translate-x-1/2 bottom-5 left-1/2">
          {slides.map((slide) => (
            <button
              key={slide.id}
              type="button"
              className={`w-3 h-3 rounded-full ${currentSlide === slide.id ? 'bg-white' : 'bg-gray-400'
                }`}
              aria-current={currentSlide === slide.id}
              aria-label={`Slide ${slide.id + 1}`}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute z-30 flex items-center justify-center h-full px-4 cursor-pointer top-1/2 group focus:outline-none"
          data-carousel-prev
          onClick={handlePrevSlide}
        >
          {/* Add your SVG for the previous button here */}
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer top-1/2 group focus:outline-none"
          data-carousel-next
          onClick={handleNextSlide}
        >
          {/* Add your SVG for the next button here */}
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
