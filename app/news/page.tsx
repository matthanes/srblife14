import { getAllPublished } from '../../utils/directus';
import BlogPostList from './components/BlogPostList';

let blog_posts = await getAllPublished();

export default function BlogPosts() {
  return (
    <>
      <h1 className='container mx-auto my-4 max-w-4xl border-b-2 px-2 pb-4 font-headings text-4xl font-black text-slate-700'>
        News Posts
      </h1>
      <BlogPostList blog_posts={blog_posts} />
    </>
  );
}
