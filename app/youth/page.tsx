import IconCard from '@/components/IconCard/IconCard';
import Slider from '@/components/Slider/Slider';
import SplitScreen from '@/components/SplitScreen/SplitScreen';
import EventCardCarousel from '@/components/EventCardCarousel/EventCardCarousel';
import { FaClock, FaEnvelope, FaPhone } from 'react-icons/fa';

import {
  getAllEvents,
  getAnnouncements,
  getSplitScreens,
} from '../../utils/directus';

let announcements = (await getAnnouncements()).data.announcements;
const splitScreens = (await getSplitScreens()).data.split_screens;

let events = (await getAllEvents()).filter((event) => {
  return event.location === 'youth' || event.location === 'homeyouth';
});

export default function Youth() {
  const slides = announcements
    .filter((announcement) => {
      return (
        announcement.location === 'youth' ||
        announcement.location === 'homeyouth'
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
          'https://srblog.srblife.com/assets/' +
          announcement.slide.filename_disk,
        opacity: 0,
        objectPosition: 'object-center',
      };
    });

  return (
    <>
      <header className='relative min-h-1/3 sm:min-h-1/2 md:min-h-3/4 xl:min-h-screen'>
        <Slider slides={slides} timing={5000}></Slider>
      </header>
      <div className='container mx-auto my-8 px-4 md:px-12'>
        <div className='mb-12 flex flex-wrap justify-center gap-3 md:gap-6'>
          <IconCard
            title='Sunday Morning Study'
            subtitle='9:15 AM'
            icon={<FaClock className='mx-auto block' size='100' />}
            target='_self'
            href='#'
          />

          <IconCard
            title='Sunday Night Study'
            subtitle='6:00 PM'
            icon={<FaClock className='mx-auto block' size='100' />}
            target='_self'
            href='#'
          />

          <IconCard
            title='Wednesday Night Study'
            subtitle='6:30 PM'
            icon={<FaClock className='mx-auto block' size='100' />}
            target='_self'
            href='#'
          />

          <IconCard
            title='Email The Youth Leader'
            subtitle='david@srblife.com'
            icon={<FaEnvelope className='mx-auto block' size='100' />}
            target='_self'
            href='mailto:david@srblife.com'
          />

          <IconCard
            title='Call Or Text'
            subtitle='706-573-0717'
            icon={<FaPhone className='mx-auto block' size='100' />}
            target='_self'
            href='tel:706-573-0717'
          />
        </div>
      </div>

      {splitScreens.map((splitScreen) => (
        <SplitScreen
          key={splitScreen.id}
          img={
            'https://srblog.srblife.com/assets/' +
            splitScreen.image.filename_disk
          }
          alt={splitScreen.alt}
          title={splitScreen.title}
          body={splitScreen.body}
          reverse={splitScreen.reverse}
        />
      ))}

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
    </>
  );
}

// export const getStaticParams = async () => {
//   const events = await getAllEvents();
//   const announcements = await getAnnouncements();
//   const splitScreens = await getSplitScreens();

//   return {
//     // props: {
//     //   events: events.data.Events,
//     //   announcements: announcements.data.announcements,
//     //   splitScreens: splitScreens.data.split_screens,
//     // },
//   };
// };
