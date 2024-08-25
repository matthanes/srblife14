'use client';

import React from 'react';
import EventCard from './EventCard';
import { SwiperWrapper, SwiperSlide } from '@/components/SwiperWrapper/SwiperWrapper';
import { SRBEvent } from '@/types';

type EventCardCarouselProps = {
  events: SRBEvent[];
};

const EventCardCarousel: React.FC<EventCardCarouselProps> = ({ events }) => {
  return (
    <SwiperWrapper>
      {events.map((event) => {
        return (
          <SwiperSlide key={event.id}>
            <EventCard event={event} />
          </SwiperSlide>
        );
      })}
    </SwiperWrapper>
  );
};

export default EventCardCarousel;
