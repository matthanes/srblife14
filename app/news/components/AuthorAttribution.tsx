import React from 'react';
import Link from 'next/link';

import { Author } from '@/types';

type AuthorAttributionProps = {
  author: Author;
}

const AuthorAttribution: React.FC<AuthorAttributionProps> = ({ author }) => {
  return (
    <div className="not-prose flex items-center">
      <Link
        href={`/news/author/${author.name.toLowerCase().replace(/\s+/g, '_')}`}
        className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary object-cover text-white"
      >
        {author?.profile_pic !== null ? (
          <img
            className="rounded-full"
            width={40}
            height={40}
            src={`https://srblog.srblife.com/assets/${author?.profile_pic?.filename_disk}?width=80&format=webp`}
            alt={author.bio}
          />
        ) : (
          author.name.split(' ').map((name) => name[0])
        )}
      </Link>
      <Link
        href={`/news/author/${author.name.toLowerCase().replace(/\s+/g, '_')}`}
        className="font-semibold text-primary hover:underline focus:outline-none focus:ring focus:ring-primary"
      >
        {author.name}
      </Link>
    </div>
  );
};

export default AuthorAttribution;
