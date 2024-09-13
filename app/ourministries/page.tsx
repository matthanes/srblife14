import SplitScreen from '@/components/SplitScreen/SplitScreen';
import { getMinistries } from '@/utils/directus';
import { Metadata } from 'next';

const ministriesData = await getMinistries();
const ministries = ministriesData.data.ministries;

export const metadata: Metadata = {
  title: 'Our Ministries | Schomburg Road Baptist Church Columbus Georgia',
  description: 'A list of ministries at Schomburg Road Baptist Church',
  keywords: 'ministries',
};

export default function OurPurpose() {
  return (
    <>
      <h1 className='container mx-auto mb-8 mt-4 border-b-2 px-8 font-headings text-4xl font-black text-slate-700 md:px-20'>
        Our <span className='font-light'>Ministries</span>
      </h1>
      <p className='mt-4 px-6 text-justify font-bodytext text-xl md:px-12 md:text-left lg:px-72'>
        We are a community of believers who are committed to following Jesus
        Christ and making a difference in the world. We believe that everyone
        has a gift to offer, and we encourage our members to use their gifts to
        serve others.
      </p>

      <p className='mt-4 px-6 text-justify font-bodytext text-xl md:px-12 md:text-left lg:px-72'>
        We have a variety of ministries that are designed to reach out to people
        of all ages and backgrounds. We are always looking for new ways to serve
        our community, and we welcome your ideas. If you are interested in
        getting involved in a ministry, please contact us.
      </p>

      <p className='mt-4 px-6 text-justify font-bodytext text-xl md:px-12 md:text-left lg:px-72'>
        We hope you will join us as we seek to love God and love others!
      </p>

      <div className='mt-16 bg-primary py-16 text-center font-headings text-white sm:px-16 md:px-20 lg:px-64'>
        <p className='px-6 text-2xl leading-10 lg:text-3xl lg:leading-[3rem]'>
          11 Now these are the gifts Christ gave to the church: the apostles,
          the prophets, the evangelists, and the pastors and teachers. 12 Their
          responsibility is to equip God&apos;s people to do his work and build up
          the church, the body of Christ. 13 This will continue until we all
          come to such unity in our faith and knowledge of God&apos;s Son that we
          will be mature in the Lord, measuring up to the full and complete
          standard of Christ.
        </p>
        <p className='pt-6 text-xl'>Ephesians 4:11-13 NLT</p>
      </div>

      {ministries.map((ministry, index) => (
        <SplitScreen
          img={
            'https://srblog.srblife.com/assets/' +
            ministry.ministry_image.filename_disk
          }
          alt={ministry.alt}
          title={ministry.title}
          body={`
            <h3 class="mb-6 text-xl leading-8">
              Ministry Leader: ${ministry.leader} <br />
              Contact: <a class="mb-4 text-primary hover:underline focus:outline-none focus:ring focus:ring-primary" href="mailto:${ministry.leader_email}">
                ${ministry.leader_email}
              </a>
            </h3>
            ${ministry.description}
          `}
          key={ministry.id}
          reverse={Boolean(index % 2)} // alternate the reverse prop
        />
      ))}
    </>
  );
}
