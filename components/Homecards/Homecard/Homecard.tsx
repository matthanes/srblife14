'use client';

import { ComponentType } from 'react';
import Link from 'next/link';
import IconComponent, {
  IconComponentProps,
} from '../../IconComponent/IconComponent';

type HomecardProps = {
  title?: string | null;
  subtitle?: string | null;
  icon?: IconComponentProps['icon'] | null;
  target?: string | null;
  rel?: string | null;
  href?: string | null;
  tag?: ComponentType<any> | string;
};

const Homecard: React.FC<HomecardProps> = ({
  title,
  subtitle,
  icon,
  target,
  rel,
  href,
  tag: Tag = 'div',
}) => {
  const content = (
    <div className='hover:bg-secondary bg-primary overflow-hidden rounded-lg py-8 text-white shadow-lg'>
      {icon && <IconComponent icon={icon} />}
      <div className='py-5'>
        <div className='mb-2 py-2 text-2xl font-bold'>{title}</div>
        <p className='text-lg'>{subtitle}</p>
      </div>
    </div>
  );
  if (Tag === 'Link') {
    return (
      <Link
        className='w-full max-w-xl cursor-pointer text-center lg:max-w-md'
        href={href || ''}
        passHref
      >
        {content}
      </Link>
    );
  }

  return (
    <Tag
      href={Tag === 'a' ? href : undefined}
      target={Tag === 'a' ? target : undefined}
      rel={Tag === 'a' ? rel : undefined}
      className='w-full max-w-xl cursor-pointer text-center lg:max-w-md'
    >
      {content}
    </Tag>
  );
};

export default Homecard;
