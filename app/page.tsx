import Slider from '@/components/Slider/Slider';
import { Author } from '@/types';
import { directus, getAnnouncements } from '@/utils/directus';

const announcements = (await getAnnouncements()).data.announcements;

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

// const {authors} = await directus.query<{ authors: Partial<Author>[] }>(`
//   query {
//     authors {
//       name
//       bio
//       profile_pic {
//         filename_disk
//         description
//       }
//     }
//   }
// `);

export default function Home() {
  return (
    <>
      <header className='relative min-h-1/3 sm:min-h-1/2 md:min-h-3/4 xl:min-h-screen'>
        <Slider slides={slides} timing={5000}></Slider>
      </header>
      <main>
        More Content
      </main>
    </>
  );
}
