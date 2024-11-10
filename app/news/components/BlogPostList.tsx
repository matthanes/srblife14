'use client';

import React, { useEffect, useRef, useState } from 'react';
import BlogPostPreview from './BlogPostPreview';

import { Post } from '@/types';

type BlogPostListProps = {
  blog_posts: Post[];
};

const BlogPostList: React.FC<BlogPostListProps> = ({ blog_posts }) => {
  // paginate the blog posts
  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(0);
  const [pageSlice, setPageSlice] = useState<Post[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const numPostsPerPage = 5;
  const numPosts = blog_posts.length;

  const handlePageChange = (value: number) => {
    if (value < 1) {
      value = 1;
    } else if (value > total_pages) {
      value = total_pages;
    }

    setPage(value);

    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  };

  // Add search component
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blog_posts);

  useEffect(() => {
    const results = blog_posts.filter(
      (post) =>
        // filter by title, description, and tags
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.author.name.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.tags_id.tag_name.toLowerCase().includes(search.toLowerCase()),
        ),
    );
    setFilteredPosts(results);
    setPage(1);
  }, [search, blog_posts]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredPosts.length / numPostsPerPage);
    const start = (page - 1) * numPostsPerPage;
    const end = start + numPostsPerPage;
    setTotalPages(totalPages);
    setPageSlice(filteredPosts.slice(start, end));
  }, [page, filteredPosts]);

  return (
    <section ref={sectionRef} className='scroll-mt-4'>
      <div className='mx-auto w-full'>
        <div className='flex justify-center'>
          <input
            className='mx-4 w-full max-w-4xl rounded-lg border-2 border-primary px-4 py-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-secondary'
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {pageSlice.map((post, index) => (
        <BlogPostPreview key={index} post={post} />
      ))}

      <div className='mt-4 flex justify-center'>
        <button
          id='prev'
          disabled={page === 1}
          className='rounded-l bg-primary px-4 py-2 font-bold text-white disabled:bg-secondary'
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <button
          id='next'
          disabled={page === total_pages}
          className='rounded-r bg-primary px-4 py-2 font-bold text-white disabled:bg-secondary'
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>

      <div className='mt-4 flex justify-center'>
        <p className='text-center'>
          Page {page} of {total_pages}
        </p>
      </div>

      {/* show links to each page */}
      <div className='my-4 flex justify-center'>
        {Array.from({ length: total_pages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-4 py-2 font-black text-primary outline focus-within:outline-none focus-within:ring focus-within:ring-primary ${
              page === i + 1 ? 'text-secondary' : ''
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BlogPostList;
