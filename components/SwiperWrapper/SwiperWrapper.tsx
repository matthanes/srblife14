'use client';

import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { SwiperProps, SwiperSlideProps } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

export const Swiper: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement> & SwiperProps,
    HTMLElement
  >
> = (props) => {
  const swiperRef = useRef<HTMLLinkElement | any>(null);
  const { children, ...rest } = props;

  useEffect(() => {
    // Register Swiper web component
    register();

    // pass component props to parameters
    const params = {
      breakpoints: {
        375: {
          slidesPerView: 1.5,
        },
        1280: {
          slidesPerView: 2.5,
        },
        1700: {
          slidesPerView: 3.5,
        },
      },
      spaceBetween: 25,
      centeredSlides: true,
      navigation: {
        enabled: true,
        disabledClass: 'disabled',
      },
      pagination: {
        enabled: true,
        clickable: true,
      },
      // injectStyles: [ //Not working
      //   `:host { --swiper-theme-color: #003d7e;}`,
      //   `.swiper-button-prev.disabled,
      //    .swiper-button-next.disabled {
      //     color: gray;
      //     cursor: not-allowed;
      //   }`,
      // ],
    } as SwiperOptions;

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  return (
    <>
      <swiper-container className='mb-12 w-[100vw]' ref={swiperRef}>
        {children}
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

  return <swiper-slide {...rest}>{children}</swiper-slide>;
};
