'use client';

import { useState, useRef, useEffect } from 'react';
import imgSrcSet from '../../utils/srcset';

const Slider = ({ slides, timing, children }) => {
  const timerRef = useRef<null | NodeJS.Timeout>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToLeft = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
  };

  const goToRight = () => {
    setCurrentSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
    }, timing);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSlide]);

  const {
    url,
    ariaLabelText,
    title,
    subtitle,
    alt,
    objectPosition,
    imgLink,
    opacity,
  } = slides[currentSlide];

  return (
    <div className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[75vh] lg:min-h-screen">
      {/* Image */}
      {/* map through slides and output ExportedImage Component */}
      {slides.map((slide, index) => (
        <img
          fetchPriority="high"
          src={slide.imgLink}
          key={index}
          alt={slide.alt}
          className={`absolute inset-0 z-0 h-full w-full object-cover ${
            slide.objectPosition
          } ${
            index === currentSlide ? 'opacity-1' : 'opacity-0'
          } transition-all duration-1000 ease-in-out`}
          sizes="100vw"
          srcSet={imgSrcSet(slide.imgLink)}
        />
      ))}

      {/* Overlay */}
      {url ? (
        <a
          href={url}
          aria-label={ariaLabelText}
          className={`absolute top-0 left-1/2 h-full w-[80vw] -translate-x-1/2 bg-black opacity-${opacity}`}
        ></a>
      ) : (
        <div
          className={`absolute top-0 left-0 h-full w-full bg-black opacity-${opacity}`}
        ></div>
      )}
      {children}

      {slides.length > 1 && (
        <>
          {/* Arrows */}
          <button
            className="z-1 absolute top-1/2 left-4 h-8 w-8 -translate-y-1/2 cursor-pointer select-none text-center text-xl text-white md:left-8 md:h-16 md:w-16 md:text-3xl"
            onClick={goToLeft}
          >
            ˂
          </button>
          <button
            className="z-1 absolute top-1/2 right-4 h-8 w-8 -translate-y-1/2 cursor-pointer select-none text-center text-xl text-white md:right-8 md:h-16 md:w-16 md:text-3xl"
            onClick={goToRight}
          >
            ˃
          </button>

          {/* Indicator Dots */}
          <div className="cover absolute bottom-0 flex w-full justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`m-1 h-3 w-3 cursor-pointer rounded-full lg:m-1 lg:h-4 lg:w-4 ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
