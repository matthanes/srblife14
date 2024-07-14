import Link from 'next/link';

import Homecard from '@/components/Homecard/Homecard';
import Slider from '@/components/Slider/Slider';

import {
  FaClock,
  FaEnvelope,
  FaMapMarkedAlt,
  FaCalendar,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import { getAnnouncements } from '@/utils/directus';

let announcements = (await getAnnouncements()).data.announcements;

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
        <section className='container mx-auto my-8 px-4 md:px-12'>
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
        </section>
      </main>
    </>
  );
}
