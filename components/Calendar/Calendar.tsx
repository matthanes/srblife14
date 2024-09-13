'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import Modal from '@/components/Modal/Modal';

import './styles.css';

const Calendar = () => {
  const windowWidth = typeof window !== 'undefined' && window.innerWidth;
  const [isMobile, setIsMobile] = useState(
    typeof windowWidth === 'number' && windowWidth < 1024 ? true : false,
  );
  const [view, setView] = useState(isMobile ? 'listMonth' : 'dayGridMonth');

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const calendarRef = useRef<FullCalendar>(null);

  // useEffect to listen for window resize
  useEffect(() => {
    const { current: calendarDom } = calendarRef;
    const API = calendarDom ? calendarDom.getApi() : null;

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setView('listMonth');
        API && API.changeView(view);
      }
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
        setView('dayGridMonth');
        API && API.changeView(view);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, view]);

  const calendarDiv = useMemo(
    () => (
      <div className='mx-4 my-4 lg:mx-0'>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin, listPlugin]}
          initialView={view}
          allDayContent=''
          contentHeight='auto'
          headerToolbar={
            isMobile
              ? {
                  left: 'title',
                  right: 'prev,next',
                }
              : {
                  left: 'dayGridMonth,dayGridWeek',
                  center: 'title',
                  right: 'prev,next today',
                }
          }
          eventDisplay='block'
          eventColor='#003D7E'
          eventTextColor='white'
          eventBackgroundColor='#003D7E'
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
          }}
          googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
          events={{
            googleCalendarId: 'srblife@gmail.com',
          }}
          eventClick={(e) => {
            e.jsEvent.preventDefault();
            setModalText(e?.event?.extendedProps?.description?.trim());
            setShowModal(true);
          }}
          ref={calendarRef}
          fixedWeekCount={false}
        />
      </div>
    ),
    [],
  );

  return (
    <div className='mx-auto max-w-md font-bodytext sm:container sm:px-8 md:px-20'>
      {showModal && (
        <Modal
          modalText={modalText}
          buttonLeft={'CLOSE'}
          leftButtonFunc={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
        />
      )}
      {calendarDiv}
    </div>
  );
};

export default Calendar;
