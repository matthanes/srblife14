import Slider from '@/components/Slider/Slider';
import EventCardCarousel from '@/components/EventCardCarousel/EventCardCarousel';

import { getAllEvents, getAnnouncements, getPage } from '@/utils/directus';
import { HomecardSection } from '@/types';
import Homecards from '@/components/Homecards/Homecards';

// TODO: Move event filtering logic into EventCardCarousel component because it is already a client component.

let announcements = (await getAnnouncements()).data.announcements;

let events = (await getAllEvents()).filter((event) => {
  return event.location === 'home' || event.location === 'homeyouth';
});

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
      objectFit: announcement.object_fit || 'cover',
      slideBackgroundColor: announcement.slide_background || '#ffffff',
      objectPosition: 'object-center',
    };
  });

export default async function Home() {
  let pages = await getPage();
  const page = pages.find((page) => page.slug === 'home');
  const homecards = page?.srb_pages_sections.find(
    (section) => section.collection === 'homecards',
  )?.item as HomecardSection;

  return (
    <>
      <header className='lg:min-h-full relative min-h-1/3 sm:min-h-1/2 md:min-h-3/4'>
        <Slider slides={slides} timing={5000}></Slider>
      </header>
      <main className='bg-slate-100'>
        <Homecards homecards={homecards} />
        <section>
          <h2 className='border-primary font-bodytext mx-auto mb-6 max-w-lg border-b-2 py-6 text-center text-4xl font-bold'>
            Upcoming Events
          </h2>
          {events.length > 0 ? (
            <EventCardCarousel events={events.slice(0, 6)} />
          ) : (
            <div className='grid place-content-center p-6 text-xl'>
              No upcoming events were found...
            </div>
          )}
        </section>
      </main>
    </>
  );
}
