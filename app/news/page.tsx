import Head from 'next/head';
import { getAllPublished } from '../../utils/directus';
import BlogPostList from './components/BlogPostList';

let blog_posts = await getAllPublished();

export default function BlogPosts() {
  return (
    <>
      <Head>
        <title>SRBlog | Schomburg Road Baptist Church Columbus, Georgia</title>
        <meta
          name="description"
          content="Schomburg Road Baptist Church news and information posts."
        />
      </Head>
      <h1 className="container mx-auto mt-4 mb-4 border-b-2 px-8 font-headings text-4xl font-black text-slate-700 sm:px-20">
        News Posts
      </h1>
      <BlogPostList blog_posts={blog_posts} />
    </>
  );
}

// export const getStaticProps = async () => {
//   const data = await getAllPublished();

//   return {
//     props: {
//       blog_posts: data.data.blog_posts,
//     },
//   };
// };
