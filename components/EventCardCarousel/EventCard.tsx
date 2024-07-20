import React from 'react';
import Link from 'next/link';
import { SRBEvent } from '@/types';

type EventCardProps = {
  event: SRBEvent;
};

const EventCard: React.FC<EventCardProps> = ({event}) => {
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
    <div className="mb-8 flex w-full max-w-sm flex-col rounded-lg bg-white text-center shadow-lg">
      <div className="rounded-t-lg border-b-2 border-secondary border-opacity-50 bg-primary px-6 py-3 text-lg text-white">
        {category}
      </div>
      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
          {title}
        </h3>
        <p className="mb-4 text-base text-neutral-600">{short_description}</p>
        {button_link && button_text && (
          <Link
            className="content mx-auto mt-auto w-fit rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium leading-5 text-white duration-150 hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring focus-visible:ring-secondary"
            href={button_link}
          >
            {button_text}
          </Link>
        )}
      </div>
      <div className="border-t-2 border-neutral-100 px-6 py-3">
        <div>{datetime}</div>
        <div>{event_location}</div>
      </div>
    </div>
  );
};

export default EventCard;
