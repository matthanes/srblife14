import React from 'react'
import parse from 'html-react-parser';

import { Author } from '@/types';

type AuthorBioProps = {
  author: Author;
};

const AuthorBio: React.FC<AuthorBioProps> = ({author}) => {
  const profilePic = author.profile_pic !== null ? `https://srblog.srblife.com/assets/${author?.profile_pic?.filename_disk}?key=375` : null;
  return (
    <section className="mx-auto my-4 max-w-4xl gap-4">
        <div className="rounded-lg bg-gray-100 p-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 place-items-center sm:items-center ">
            <div className="flex h-40 w-40 items-center justify-center rounded-md bg-primary object-cover text-7xl text-white sm:mx-4">
              {profilePic ? (
                <img
                  className="rounded-md"
                  width={160}
                  height={160}
                  src={profilePic}
                  alt={author.bio}
                />
              ) : (
                author.name.split(' ').map((name) => name[0])
              )}
            </div>

            <div className="sm:col-span-2">
              <h1 className="text-4xl font-bodytext tracking-tighter mb-4">Author Bio - {author.name}</h1>
              {author.bio && parse(author.bio)}
            </div>
          </div>
        </div>
      </section>
  )
}

export default AuthorBio