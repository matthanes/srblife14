import React from 'react';
import AuthorBio from '../../components/AuthorBio';
import BlogPostList from '../../components/BlogPostList';
import { getAllAuthors, getAllPublished} from '@/utils';

type AuthorProps = {
  params: {
    author: string;
  };
};

const Author = async (props: AuthorProps) => {
  const author_slug = props.params.author;
  const posts = await getAllPublished();
  const authors = await getAllAuthors();
  const postsByAuthor = posts.filter((post) => {
    return (
      post.author.name.toLowerCase().replace(/\s+/g, '_') === author_slug
    );
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
