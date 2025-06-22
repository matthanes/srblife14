'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface Slide {
  url: string;
  ariaLabelText?: string;
  title: string;
  alt: string;
  imgLink: string;
  opacity: number;
  objectPosition: string;
}

interface SliderProps {
  slides: Slide[];
  timing?: number;
}

export default function Slider({ slides, timing = 6000 }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const mouseOverRef = useRef(false);

  // If they prefer reduced motion, we will disable animations
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const clearAutoAdvanceTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoAdvanceTimer = useCallback(() => {
    clearAutoAdvanceTimer();
    if (!reducedMotion && slides.length > 1 && !mouseOverRef.current) {
      timerRef.current = setTimeout(() => {
        const newIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(newIndex);
        // Announce slide change to screen readers
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = `Showing slide ${newIndex + 1} of ${slides.length}`;
        }
        if (!reducedMotion) setIsAnimating(true);
      }, timing);
    }
  }, [currentIndex, slides.length, timing, reducedMotion]);

  useEffect(() => {
    startAutoAdvanceTimer();
    return clearAutoAdvanceTimer;
  }, [
    currentIndex,
    slides.length,
    timing,
    reducedMotion,
    startAutoAdvanceTimer,
  ]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    clearAutoAdvanceTimer();
    if (!reducedMotion) setIsAnimating(true);
    setCurrentIndex(index);

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Showing slide ${index + 1} of ${slides.length}`;
    }
  };

  const nextSlide = () => {
    if (slides.length <= 1) return;
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match with CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      ref={sliderRef}
      className='max-h-screen-nav relative aspect-16/9 w-full overflow-hidden'
      role='region'
      aria-roledescription='carousel'
      aria-label='Image slider'
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        mouseOverRef.current = true;
        clearAutoAdvanceTimer();
      }}
      onMouseLeave={() => {
        mouseOverRef.current = false;
        startAutoAdvanceTimer();
      }}
      // Match the transition timing with the useEffect timing above
      style={{
        transition: reducedMotion ? 'none' : 'transform 0.5s ease-in-out',
      }}
    >
      <a
        href='#slider-controls'
        className='sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2 focus:text-black'
      >
        Skip to slider controls
      </a>

      <div
        ref={liveRegionRef}
        className='sr-only'
        aria-live='polite'
        aria-atomic='true'
      >
        Showing slide {currentIndex + 1} of {slides.length}
      </div>

      <div
        className='absolute flex h-full w-full'
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
          transition: reducedMotion ? 'none' : 'transform 0.5s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className='relative'
            style={{ width: `${100 / slides.length}%` }}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={slide.imgLink}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover ${slide.objectPosition}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            <div
              className='absolute inset-0'
              style={{ backgroundColor: `rgba(0, 0, 0, ${slide.opacity})` }}
            >
              {slide.url ? (
                <Link
                  href={slide.url}
                  aria-label={slide.ariaLabelText || slide.title}
                  className='flex h-full w-full flex-col items-center justify-center p-4 text-center text-white'
                  tabIndex={index === currentIndex ? 0 : -1}
                >
                  {slide.title && slide.opacity !== 0 && (
                    <h2 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>
                      {slide.title}
                    </h2>
                  )}
                </Link>
              ) : (
                <div className='flex h-full w-full flex-col items-center justify-center p-4 text-center text-white'>
                  {slide.title && slide.opacity !== 0 && (
                    <h2 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>
                      {slide.title}
                    </h2>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div id='slider-controls'>
          {/* Navigation Arrows */}
          <button
            className='bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 left-8 z-10 -translate-y-1/2 rounded-full bg-black p-1 text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden'
            onClick={prevSlide}
            aria-label='Previous slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='15 18 9 12 15 6'></polyline>
            </svg>
          </button>
          <button
            className='bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 right-8 z-10 -translate-y-1/2 rounded-full bg-black p-1 text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden'
            onClick={nextSlide}
            aria-label='Next slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='9 18 15 12 9 6'></polyline>
            </svg>
          </button>

          {/* Indicator Dots */}
          <div
            className='absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 space-x-2 rounded-full bg-black/50 p-2'
            role='tablist'
            aria-label='Select a slide to show'
          >
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? 'bg-gray-200' : 'bg-white/50'
                } hover:transition-opacity focus:ring-2 focus:ring-white focus:ring-offset-1 focus:outline-hidden`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === currentIndex}
                role='tab'
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
