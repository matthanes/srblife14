'use client';

import React from 'react';
import EventCard from './EventCard';
import { Swiper, SwiperSlide } from '@/components/SwiperWrapper/SwiperWrapper';
import { SRBEvent } from '@/types';

type EventCardCarouselProps = {
  events: SRBEvent[];
};

const EventCardCarousel: React.FC<EventCardCarouselProps> = ({ events }) => {
  return (
    <Swiper>
      {events.map((event) => {
        return (
          <SwiperSlide className={'flex h-auto justify-center'} key={event.id}>
            <EventCard event={event} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default EventCardCarousel;
