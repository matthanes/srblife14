import type { MetadataRoute } from 'next';
import { getAllAuthors, getAllPublished, getAllTags } from '@/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blog_posts = await getAllPublished();
  const authors = await getAllAuthors();
  const tags = await getAllTags();

  const blog_pages: MetadataRoute.Sitemap = blog_posts.map((post) => {
    return {
      url: `https://srblife.com/news/${post.slug}`,
      lastModified: post.publish_date,
      changeFrequency: 'never',
      priority: 0.8,
    };
  });

  const author_pages: MetadataRoute.Sitemap = authors.map((author) => {
    return {
      url: `https://srblife.com/news/author/${author.name.toLowerCase().replace(/\s+/g, '_')}`,
      lastModified: author.date_updated,
      changeFrequency: 'never',
      priority: 0.8,
    };
  });

  const tag_pages: MetadataRoute.Sitemap = tags.map((tag) => {
    return {
      url: `https://srblife.com/news/tag/${tag.tag_name}`,
      lastModified: tag.date_updated,
      changeFrequency: 'never',
      priority: 0.8,
    };
  });

  const static_pages: MetadataRoute.Sitemap = [
    {
      url: 'https://srblife.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://srblife.com/news',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/calendar',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/giving',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/ourbeliefs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/ourministries',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/news/ourpurpose',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/salvation',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://srblife.com/youth',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [...blog_pages, ...author_pages, ...tag_pages, ...static_pages];
}
