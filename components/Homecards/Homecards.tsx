'use client';

import React, { useEffect } from 'react';
import { setAttr, apply } from '@directus/visual-editing';
import Homecard from './Homecard/Homecard';
import { HomecardSection } from '@/types';
import { isValidIcon } from '@/utils/validators';

type HomecardsProps = {
  homecards: HomecardSection;
};

const Homecards: React.FC<HomecardsProps> = ({ homecards }) => {
  useEffect(() => {
    apply({ directusUrl: 'https://srblog.srblife.com' });
  }, []);
  return (
    <section className='container mx-auto px-4 py-8 md:px-12'>
      <div
        data-directus={setAttr({
          collection: 'homecards',
          item: homecards.id,
          fields: 'homecard',
          mode: 'drawer',
        })}
        className='mb-12 flex flex-wrap justify-center gap-3 md:gap-6'
      >
        {homecards.homecard.map((homecard) => {
          if (!isValidIcon(homecard.icon)) {
            return null;
          }
          return (
            <Homecard
              key={homecard.title}
              tag={homecard.tag}
              title={homecard.title}
              subtitle={homecard.subtitle}
              icon={homecard.icon}
              target={homecard.target}
              rel={homecard.rel}
              href={homecard.href}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Homecards;
