import React from 'react';
import BlogPostList from '../../components/BlogPostList';
import titleCase, { getAllTags, getAllPublished} from '@/utils';

type TagProps = {
  params: {
    tag: string;
  };
};

const Author = async (props: TagProps) => {
  const tag_slug = props.params.tag;
  const posts = await getAllPublished();
  const postsByTag = posts.filter((post) => {
    return post.tags.some(
      (tag) => tag.tags_id.tag_name.toLowerCase() === tag_slug
    );
  });

  return (
    <div>
      <h1 className='container mx-auto my-4 max-w-4xl border-b-2 px-2 pb-4 font-headings text-4xl font-black text-slate-700'>
        News Posts By Tag - {titleCase(tag_slug)}
      </h1>
      <BlogPostList blog_posts={postsByTag} />
    </div>
  );
};

export const generateStaticParams = async () => {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: tag.tag_name.toLowerCase(),
  }));

};

export default Author;
