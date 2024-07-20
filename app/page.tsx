import Link from 'next/link';

import Homecard from '@/components/Homecard/Homecard';
import Slider from '@/components/Slider/Slider';
import EventCardCarousel from '@/components/EventCardCarousel/EventCardCarousel';

import {
  FaClock,
  FaEnvelope,
  FaMapMarkedAlt,
  FaCalendar,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import { getAllEvents, getAnnouncements } from '@/utils/directus';
import { SRBEvent } from '@/types';

let announcements = (await getAnnouncements()).data.announcements;

const events = [
  {
    id: '28',
    title: 'VBS Training Day',
    status: 'archived',
    category: 'VBS',
    datetime: '2024-08-01T18:00:00',
    short_description: 'Leaders for VBS will need to attend for training.',
    event_location: 'Schomburg Road Baptist Church',
    location: 'homeyouth',
  },
  {
    id: '30',
    title: 'Car Wash',
    status: 'archived',
    category: 'Car Wash',
    datetime: '2024-08-04T11:00:00',
    short_description:
      'MARK YOUR CALENDAR - The SRB students are hosting their annual Car Wash. This not only a summer camp fundraiser but also a free car wash for the neighborhood as a ministry outreach. We will have snow cones and bounce houses for the kids as well. ',
    event_location:
      'Schomburg Road Baptist Church - 7155 Schomburg Road Columbus GA 31909 ',
    button_link: 'https://srblife.com/news/student-car-wash-fundraiser-2024/',
    button_text: 'Car Wash Details',
    location: 'homeyouth',
  },
  {
    id: '26',
    title: 'Church Breakfast',
    status: 'archived',
    category: 'Discipleship',
    datetime: '2024-08-12T08:30:00',
    short_description:
      'Join us for church breakfast and joint Sunday School sponsored by our wonderful deacons.',
    event_location: 'Schomburg Road Baptist Church',
    location: 'homeyouth',
  },
  {
    id: '31',
    title: 'VBS Decoration Making Day',
    status: 'archived',
    category: 'VBS',
    datetime: '2024-09-01T09:00:00',
    short_description:
      'Join us in creating decorations for the upcoming Vacation Bible School!',
    event_location: 'Fellowship Hall',
    location: 'homeyouth',
  },
  {
    id: '36',
    title: 'VBS Decoration Day',
    status: 'archived',
    category: 'Fellowship',
    datetime: '2024-09-12T18:00:00',
    short_description:
      'Join us for decorating the church to prepare for Vacation Bible School',
    event_location: 'Schomburg Road Baptist Church',
    location: 'homeyouth',
  },
  {
    id: '32',
    title: 'Water Day',
    status: 'archived',
    category: 'Family Fun',
    datetime: '2024-09-15T13:00:00',
    short_description:
      'We will having a family water day to celebrate the start of Vacation Bible School.',
    event_location: 'Schomburg Road Baptist Church',
    button_link: 'https://srblife.com/news/breaker-rock-beach-vbs-2024/',
    button_text: 'VBS Full Post',
    location: 'homeyouth',
  },
  {
    id: '33',
    title: 'Start of VBS!',
    status: 'archived',
    category: 'Discipleship',
    datetime: '2024-09-17T18:00:00',
    short_description:
      "Vacation Bible School starts and you don't want to miss it!",
    event_location: 'SRB',
    button_link: 'https://kideventpro.lifeway.com/myEvent/?id=69324',
    button_text: 'VBS Registration',
    location: 'homeyouth',
  },
  {
    id: '34',
    title: 'End of VBS!',
    status: 'archived',
    category: 'Discipleship',
    datetime: '2024-09-21T18:00:00',
    short_description: "Vacation Bible School ends but the fun doesn't stop. ",
    event_location: 'SRB',
    button_link: 'https://kideventpro.lifeway.com/myEvent/?id=69324',
    button_text: 'VBS Registration',
    location: 'homeyouth',
  },
  {
    id: '35',
    title: 'Campfire Night',
    status: 'archived',
    category: 'Family Fun',
    datetime: '2024-09-22T18:00:00',
    short_description:
      "Vacation Bible School is over, but the family fun doesn't stop.",
    event_location: 'SRB Lawn',
    location: 'homeyouth',
  },
  {
    id: '37',
    title: 'Mission Trip',
    status: 'archived',
    category: 'Missions',
    datetime: '2024-10-13T08:00:00',
    short_description:
      'The Mission Team will be leaving for their Mission Trip to Habersham County. Please pray for their success!',
    event_location: 'Schomburg Road Baptist Church',
    location: 'homeyouth',
  },
] satisfies SRBEvent[];

// remove any announcements from the array that have an end date that is in the past
const now = new Date();
announcements = announcements.filter((announcement) => {
  if (!announcement.end_date) {
    return true;
  }
  const endDate = new Date(announcement.end_date);
  return endDate > now;
});

const slides = announcements
  .filter((announcement) => {
    return (
      announcement.location === 'home' || announcement.location === 'homeyouth'
    );
  })
  .map((announcement) => {
    return {
      url: announcement.slide_link || '',
      ariaLabelText: announcement.link_label,
      title: announcement.title,
      subtitle: announcement.subtitle ?? '',
      alt: announcement.alt_text,
      imgLink:
        'https://srblog.srblife.com/assets/' + announcement.slide.filename_disk,
      opacity: 0,
      objectPosition: 'object-center',
    };
  });

export default function Home() {
  return (
    <>
      <header className='min-h-1/3 sm:min-h-1/2 md:min-h-3/4 relative lg:min-h-screen-nav'>
        <Slider slides={slides} timing={5000}></Slider>
      </header>
      <main className='bg-slate-100'>
        <section className='container mx-auto py-8 px-4 md:px-12'>
          <div className='mb-12 flex flex-wrap justify-center gap-3 md:gap-6'>
            <Homecard
              tag='a'
              title='7155 Schomburg Road'
              subtitle='Columbus, GA 31909'
              icon={<FaMapMarkedAlt className='mx-auto block' size='100' />}
              target='_blank'
              href='https://goo.gl/maps/6vrJMr3Cd86JH3do9'
              rel='noopener'
            />
            <Homecard
              tag='div'
              title='Sunday Worship'
              subtitle='10:30 AM'
              icon={<FaClock className='mx-auto block' size='100' />}
              target='_self'
              href='#'
            />
            <Homecard
              tag={Link}
              title='Calendar'
              subtitle='Important Dates'
              icon={<FaCalendar className='mx-auto block' size='100' />}
              target='_self'
              href='/calendar'
            />
            <Homecard
              tag='a'
              title='Email For Info'
              subtitle='info@srblife.com'
              icon={<FaEnvelope className='mx-auto block' size='100' />}
              target='_self'
              href='mailto:info@srblife.com'
            />
            <Homecard
              tag='a'
              title='Prayer Request'
              subtitle='prayer@srblife.com'
              icon={<FaEnvelope className='mx-auto block' size='100' />}
              target='_self'
              href='mailto:prayer@srblife.com'
            />
            <Homecard
              tag='a'
              title='Email The Pastor'
              subtitle='PastorBuddy@srblife.com'
              icon={<FaEnvelope className='mx-auto block' size='100' />}
              target='_self'
              href='mailto:PastorBuddy@srblife.com'
            />
            <Homecard
              tag='a'
              title='SRBLife'
              subtitle='Facebook'
              icon={<FaFacebook className='mx-auto block' size='100' />}
              target='_blank'
              href='https://www.facebook.com/SRBLife'
              rel='noopener'
            />

            <Homecard
              tag='a'
              title='YouTube'
              subtitle='Sermons'
              icon={<FaYoutube className='mx-auto block' size='100' />}
              target='_blank'
              href='https://www.youtube.com/channel/UCSaSFpr8E-PMYfi1QoqwVuw/'
              rel='noopener'
            />
          </div>
          <h2 className="mx-auto mb-6 max-w-lg border-b-2 border-primary py-6 text-center font-bodytext text-4xl font-bold">
        Upcoming Events
      </h2>
      {events.length > 0 ? (
        <EventCardCarousel events={events} />
      ) : (
        <div className="grid place-content-center p-6 text-xl">
          No upcoming events were found...
        </div>
      )}
        </section>
      </main>
    </>
  );
}
