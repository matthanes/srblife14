'use client';

import { Post } from '@/types';
import { setAttr, apply } from '@directus/visual-editing';
import React from 'react';

type PostTitleProps = {
  post: Post;
};

const PostTitle: React.FC<PostTitleProps> = (props) => {
  const { post } = props;

  React.useEffect(() => {
    apply({ directusUrl: 'https://srblog.srblife.com/admin' });
  }, []);

  return (
    <h1
      data-directus={setAttr({
        collection: 'blog_posts',
        item: post.id,
        fields: 'title',
        mode: 'drawer',
      })}
      className='!text-4xl'
    >
      {post.title}
    </h1>
  );
};

export default PostTitle;
