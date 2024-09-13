import React from 'react';
import type { Metadata } from 'next';
import Calendar from '@/components/Calendar/Calendar';

export const metadata: Metadata = {
  title: 'Calendar | Schomburg Road Baptist Church Columbus, Georgia',
  description: 'Church calendar of events.',
  keywords: 'calendar',
};

const CalendarPage = () => {
  
  return (
    <div className='mx-auto max-w-md font-bodytext sm:container sm:px-8 md:px-20'>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
