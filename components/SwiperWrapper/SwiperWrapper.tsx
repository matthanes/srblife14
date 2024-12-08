'use client';

import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { SwiperProps, SwiperSlideProps } from 'swiper/react';
import { SwiperOptions, Swiper } from 'swiper/types';

interface SwiperContainerElement extends HTMLElement, Omit<Swiper, 'translate'> {
  initialize: () => void;
}

interface CustomSwiperProps extends SwiperProps {
  swiperParams?: SwiperOptions;
}

export const SwiperWrapper: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement> & CustomSwiperProps,
    HTMLElement
  >
> = (props) => {
  const swiperRef = useRef<SwiperContainerElement>(null);
  const { children, swiperParams, ...rest } = props;

  useEffect(() => {
    register();

    const defaultParams: SwiperOptions = {
      breakpoints: {
        320: { // xs
          slidesPerView: 1,
        },
        640: { // sm
          slidesPerView: 2,
        },
        768: { //md
          slidesPerView: 2,
        },
        1024: { //lg
          slidesPerView: 3,
        },
        1280: { //xl
          slidesPerView: 4,
        }
      },
      centeredSlides: true,
      spaceBetween: 25,
      navigation: {
        enabled: true,
        disabledClass: 'disabled',
      },
      pagination: {
        enabled: true,
        clickable: true,
      },
    };

    const params = { ...defaultParams, ...swiperParams };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
    

  }, [swiperParams]);

  const handleSwiperNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <swiper-container style={{
          '--swiper-theme-color': '#003d7e',
          '--swiper-pagination-bottom': '0px'
        }} ref={swiperRef} init={false} {...rest}>
        {children}
      {/* @ts-ignore */}
      </swiper-container>
    </>
  );
};

export const SwiperSlide: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
    HTMLElement
  >
> = (props) => {
  const { children, ...rest } = props;
  {/* @ts-ignore */}
  return <swiper-slide {...rest}>{children}</swiper-slide>;
};
