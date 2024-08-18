import type { Metadata } from 'next';
import TagsList from '../components/TagsList';
import SocialShare from '../components/SocialShare';
import AuthorAttribution from '../components/AuthorAttribution';
import parse from 'html-react-parser';
import { getAllPublished, getSinglePost } from '@/utils';

import React, { FC } from 'react';
import { Post } from '@/types';

type BlogPostProps = {
  params: {
    slug: string;
  };
};

const BlogPost = async ( props: BlogPostProps ) => {
  const singlePost = await getSinglePost(props.params.slug);

  const {
    title,
    description,
    publish_date,
    author,
    post,
    tags,
    social_media_image,
  } = singlePost;

  const formattedDate = new Date(publish_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const tagsList = tags.map((tag) => tag.tags_id.tag_name).join(', ');

  const metadata: Metadata = {
    title: `${title} | Schomburg Road Baptist Church Columbus, Georgia`,
    description,
    keywords: tagsList,
    authors: { name: author.name },
    openGraph: {
      title: `${title} | Schomburg Road Baptist Church Columbus, Georgia`,
      description,
      type: 'article',
      publishedTime: publish_date,
      authors: [author.name],
      images: social_media_image
        ? [
            {
              url: `https://srblog.srblife.com/assets/${social_media_image.filename_disk}`,
            },
          ]
        : undefined,
    },
    twitter: {
      title: `${title} | Schomburg Road Baptist Church Columbus, Georgia`,
      description,
      card: 'summary_large_image',
      images: social_media_image
        ? `https://srblog.srblife.com/assets/${social_media_image.filename_disk}`
        : undefined,
      creator: '@SRBLife',
    },
  };

  return (
    <div className='bg-slate-100'>
      <article className='min-h-screen-foot p-4'>
        <div className='relative w-full bg-white px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:pb-28 lg:pt-16'>
          <div className='prose prose-stone mx-auto lg:prose-xl prose-h1:text-secondary prose-a:text-primary'>
            <h1 className='!text-4xl'>{title}</h1>
            <div className='mb-4 flex items-center justify-between border-y-2 border-secondary py-3'>
              <span className='font-bold'>{formattedDate}</span>
              <AuthorAttribution author={author} />
            </div>
            <SocialShare
              title={title}
              base_url='https://srblife.com'
              size={34}
            />
            {post && parse(post)}
            <section>
              <h3 className='mb-4 border-b-2 border-secondary border-opacity-50 pb-2 text-xl text-primary'>
                Post Tags
              </h3>
              <TagsList tags={tags} />
            </section>
          </div>
        </div>
      </article>
    </div>
  );
};

export const generateStaticParams = async () => {
  const posts = await getAllPublished();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

// export const getStaticProps = async ({ params }) => {
//   const singlePost = await getSinglePost(params.slug);

//   return {
//     props: singlePost,
//   };
// };

// export const getStaticPaths = async () => {
//   const data = await getAllPublished();
//   const paths = data.data.blog_posts.map(({ slug }) => ({ params: { slug } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default BlogPost;
