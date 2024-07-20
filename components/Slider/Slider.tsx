'use client';

import { useState, useRef, useEffect } from 'react';
import imgSrcSet from '@/utils/srcset';

type Slide = {
  url?: string | null;
  ariaLabelText?: string | null;
  title?: string | null;
  subtitle?: string | null;
  alt?: string | null;
  objectPosition?: string | null;
  imgLink?: string | null;
  opacity: number | null;
};

type SliderProps = {
  slides: Slide[];
  timing: number;
  children?: React.ReactNode;
};

const Slider = ({ slides, timing, children }: SliderProps) => {
  const timerRef = useRef<null | number>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false);

  const goToLeft = () => {
    setIsManualChange(true);
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
  };

  const goToRight = () => {
    setIsManualChange(true);
    setCurrentSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
  };

  useEffect(() => {
    if (isManualChange) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    } else {
      timerRef.current = window.setInterval(() => {
        setCurrentSlide(
          currentSlide < slides.length - 1 ? currentSlide + 1 : 0,
        );
      }, timing);
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [currentSlide, isManualChange]);

  return (
    <div className='lg:min-h-screen-nav relative min-h-[35vh] sm:min-h-[50vh] md:min-h-[75vh]'>
      {/* Image */}
      {slides.map((slide, index) => (
        <img
          fetchPriority='high'
          src={slide.imgLink || ''}
          key={index}
          alt={slide.alt || ''}
          className={`absolute inset-0 z-0 h-full w-full object-cover ${
            slide.objectPosition
          } ${
            index === currentSlide ? 'opacity-1' : 'opacity-0'
          } transition-all duration-1000 ease-in-out`}
          sizes='100vw'
          srcSet={imgSrcSet(slide.imgLink)}
        />
      ))}

      {/* Overlay */}
      {slides[currentSlide].url ? (
        <a
          href={slides[currentSlide].url || '#'}
          aria-label={slides[currentSlide].ariaLabelText || ''}
          className={`absolute left-1/2 top-0 h-full w-[80vw] -translate-x-1/2 bg-black opacity-${slides[currentSlide].opacity}`}
        />
      ) : (
        <div
          className={`absolute left-0 top-0 h-full w-full bg-black opacity-${slides[currentSlide].opacity}`}
        ></div>
      )}
      {children}

      {slides.length > 1 && (
        <>
          {/* Arrows */}
          <button
            className='z-1 absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer select-none text-center text-xl text-white md:left-8 md:h-16 md:w-16 md:text-3xl'
            onClick={goToLeft}
          >
            ˂
          </button>
          <button
            className='z-1 absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer select-none text-center text-xl text-white md:right-8 md:h-16 md:w-16 md:text-3xl'
            onClick={goToRight}
          >
            ˃
          </button>

          {/* Indicator Dots */}
          <div className='cover absolute bottom-0 flex w-full justify-center'>
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={`m-1 h-3 w-3 cursor-pointer rounded-full lg:m-1 lg:h-4 lg:w-4 ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => {
                  setIsManualChange(true);
                  setCurrentSlide(index);
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
