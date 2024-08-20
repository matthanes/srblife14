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
      <swiper-container ref={swiperRef} init={false} {...rest}>
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
