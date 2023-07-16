import React from 'react';
import image2 from '../assets/carousel-2.jpg';
import image3 from '../assets/carousel-3.jpg';

const carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };
  return (
    <>
      <div>
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            <div
              className={`transform ${currentSlide === 0 ? 'translate-x-0' : 'translate-x-full'
                } duration-700 ease-in-out`}
              data-carousel-item
            >
              <img
                src={image2}
                className="absolute block w-full top-0 left-0 h-full object-cover"
                alt="Slide 2"
              />
            </div>
            <div
              className={`transform ${currentSlide === 1 ? 'translate-x-0' : 'translate-x-full'
                } duration-700 ease-in-out`}
              data-carousel-item
            >
              <img
                src={image3}
                className="absolute block w-full top-0 left-0 h-full object-cover"
                alt="Slide 3"
              />
            </div>

          </div>

          <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
            <button
              type="button"
              className={`w-3 h-3 rounded-full ${currentSlide === 0 ? 'bg-white' : 'bg-gray-400'
                }`}
              aria-current={currentSlide === 0}
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              type="button"
              className={`w-3 h-3 rounded-full ${currentSlide === 1 ? 'bg-white' : 'bg-gray-400'
                }`}
              aria-current={currentSlide === 1}
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              type="button"
              className={`w-3 h-3 rounded-full ${currentSlide === 2 ? 'bg-white' : 'bg-gray-400'
                }`}
              aria-current={currentSlide === 2}
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
          </div>

          <button
            type="button"
            className="absolute top-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
            onClick={handlePrevSlide}
          >
            {/* Add your SVG for the previous button here */}
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
            onClick={handleNextSlide}
          >
            {/* Add your SVG for the next button here */}
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default carousel;