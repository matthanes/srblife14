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
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
        1700: {
          slidesPerView: 4,
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
      injectStyles: [
        `
          :host {
            --swiper-theme-color: #003d7e !important;
          }
          .swiper-button-prev.disabled,
          .swiper-button-next.disabled {
          color: gray;
          cursor: not-allowed;
          }
      `,
      ],
    } as SwiperOptions;

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  return (
    <>
      <swiper-container ref={swiperRef} init={false}>
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
