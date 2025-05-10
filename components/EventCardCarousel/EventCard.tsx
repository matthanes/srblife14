import React from 'react';
import Link from 'next/link';
import { SRBEvent } from '@/types';

type EventCardProps = {
  event: SRBEvent;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  let {
    title,
    category,
    short_description,
    datetime,
    button_link,
    button_text,
    event_location,
  } = event;

  datetime = new Date(datetime).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className='mx-auto mb-8 flex w-full max-w-sm flex-col rounded-lg bg-white text-center shadow-lg lg:max-w-lg'>
      <div className='border-secondary border-opacity-50 bg-primary rounded-t-lg border-b-2 px-6 py-3 text-lg text-white'>
        {category}
      </div>
      <div className='flex grow flex-col p-6'>
        <h3 className='mb-2 text-xl leading-tight font-medium text-neutral-800'>
          {title}
        </h3>
        <p className='mb-4 text-base text-neutral-600'>{short_description}</p>
        {button_link && button_text && (
          <Link
            className='content bg-primary hover:bg-opacity-90 focus-visible:ring-secondary mx-auto mt-auto w-fit rounded-lg border border-transparent px-4 py-2 text-sm leading-5 font-medium text-white duration-150 focus-visible:ring-3 focus-visible:outline-hidden'
            href={button_link}
          >
            {button_text}
          </Link>
        )}
      </div>
      <div className='border-t-2 border-neutral-100 px-6 py-3'>
        <div>{datetime}</div>
        <div>{event_location}</div>
      </div>
    </div>
  );
};

export default EventCard;
