import React from 'react';
import AuthorBio from '../../components/AuthorBio';
import BlogPostList from '../../components/BlogPostList';
import { getAllAuthors, getAllPublished } from '@/utils';

type AuthorProps = {
  params: Promise<{
    author: string;
  }>;
};

export async function generateMetadata(props: AuthorProps) {
  const params = await props.params;
  const authors = await getAllAuthors();
  const author = authors.filter((author) => {
    return author.name.toLowerCase().replace(/\s+/g, '_') === params.author;
  });

  // remove p tags from bio
  author[0].bio = author[0].bio?.replace(/<p>/g, '');
  author[0].bio = author[0].bio?.replace(/<\/p>/g, '');

  return {
    title: `${author[0].name} | Schomburg Road Baptist Church Columbus, Georgia`,
    description: author[0].bio,
    openGraph: {
      title: `${author[0].name} | Schomburg Road Baptist Church Columbus, Georgia`,
      description: author[0].bio,
      type: 'profile',
      profile: {
        firstName: author[0].name.split(' ')[0],
        lastName: author[0].name.split(' ')[1],
      },
    },
    twitter: {
      title: `${author[0].name} | Schomburg Road Baptist Church Columbus, Georgia`,
      description: author[0].bio,
      card: 'summary',
      creator: '@SRBLife',
    },
  };
}

const Author = async (props: AuthorProps) => {
  const author_slug = (await props.params).author;
  const posts = await getAllPublished();
  const authors = await getAllAuthors();
  const postsByAuthor = posts.filter((post) => {
    return post.author.name.toLowerCase().replace(/\s+/g, '_') === author_slug;
  });

  const author = authors.filter((author) => {
    return author.name.toLowerCase().replace(/\s+/g, '_') === author_slug;
  });

  return (
    <div>
      <AuthorBio author={author[0]} />
      <BlogPostList blog_posts={postsByAuthor} />
    </div>
  );
};

export const generateStaticParams = async () => {
  const authors = await getAllAuthors();

  return authors.map((author) => ({
    author: author.name.toLowerCase().replace(/\s+/g, '_'),
  }));
};

export default Author;
