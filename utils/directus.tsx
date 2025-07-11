import { authentication, createDirectus, graphql } from '@directus/sdk';

// import types from types folder
import {
  AllAnnouncements,
  AllAuthors,
  AllMinistries,
  AllPosts,
  AllSplitScreens,
  AllSRBEvents,
  DirectusFile,
  DirectusSchema,
  Post,
  SRBPage,
  Tag,
} from '@/types';

export const directus = createDirectus<DirectusSchema>(
  'https://srblog.srblife.com/',
)
  .with(authentication())
  .with(
    graphql({
      //@ts-expect-error
      onRequest: (options) => ({ ...options, cache: 'no-store' }),
    }),
  );

process.env.DIRECTUS_TOKEN && directus.setToken(process.env.DIRECTUS_TOKEN);

export const getSrcKey = (src: string) => src.split('/').pop();

export const removeParams = (src: string) =>
  /\?/.test(src) ? src.split('?')[0] : src;

export const getFiles = async () => {
  const files = await fetch('https://srblog.srblife.com/graphql/system', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query {
        files
        {
          id
          filename_disk
        }
      }
      `,
    }),
  });

  const data = await files.json();
  const filesList: DirectusFile[] = data.data.files;

  return filesList;
};

export const getSinglePost = async (slug: string) => {
  const blog_posts = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `query {
          blog_posts (filter: {slug: {_eq: "${slug}"}})
          {
            title
            description
            post
            publish_date
            author {
                name
                profile_pic {
                  filename_disk
                  description
              }
            }
            tags {
                tags_id {
                    tag_name
                }
            }
            slug
            social_media_image {
              filename_disk
              description
            }
          }
      }
        `,
    }),
  });

  const data = await blog_posts.json();
  const singlePost: Post = data.data.blog_posts[0];

  // const files = await getFiles();

  // // find images in singlePost.post and replace the src URL with cdnUrl
  // const images = singlePost.post.match(/<img.*?src=".*?".*?>/g);
  // if (images) {
  //   images.forEach((image) => {
  //     const src = image.match(/src=".*?"/g)[0];
  //     const fileId = removeParams(getSrcKey(src));
  //     const file = files.find((file) => file.id === fileId);
  //     const newSrc = `${cdnUrl}/${file.filename_disk}`;
  //     singlePost.post = singlePost.post.replace(src, `src="${newSrc}"`);
  //   });
  // }

  return singlePost;
};

export const getAllPublished = async () => {
  const query_filter =
    process.env.NODE_ENV === 'development'
      ? `limit: -1,
        sort:"-publish_date",
        filter: { _or: [
        { status: { _eq: "published" } },
        { status: { _eq: "draft" } }
      ] }`
      : `limit: -1, sort:"-publish_date", filter: { status: { _eq: "published" } }`;
  const blog_posts = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query {
        blog_posts(
          ${query_filter}
      )
        {
          title
          description
          publish_date
          author {
              name
              bio
              profile_pic {
                filename_disk
                description
            }
          }
          tags {
              tags_id {
                  tag_name
              }
          }
          slug
          social_media_image {
            filename_disk
            description
          }
        }
    }
      `,
    }),
  });

  const posts: AllPosts = await blog_posts.json();
  return posts.data.blog_posts;
};

export const getAllTags = async () => {
  const tagsData = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
          query {
            tags {
              tag_name
              date_updated
          }
        }
        `,
    }),
  });

  const data = await tagsData.json();
  const tags: {
    tag_name: string;
    date_updated: string;
  }[] = data.data.tags;

  return tags;
};

export const getAllAuthors = async () => {
  const authors = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
          query {
            authors {
              name
              bio
              date_updated
              profile_pic {
                filename_disk
                description
            }
          }
        }
        `,
    }),
  });

  const data: AllAuthors = await authors.json();

  return data.data.authors;
};

export const getAllEvents = async () => {
  const query_filter =
    process.env.NODE_ENV === 'development'
      ? `limit: -1, filter: { _or: [
      { status: { _eq: "published" } },
      { status: { _eq: "draft" } }
      ] },
      sort: [ "datetime" ]`
      : `limit: -1, filter: { status: { _eq: "published" } }, sort: [ "datetime" ]`;
  const events = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
          query {
            Events (
              ${query_filter}
          )
          {
              id
              title
              status
              category
              datetime
              datetimeend
              short_description
              event_location
              button_link
              button_text
              location
          }
        }
        `,
    }),
  });

  const data: AllSRBEvents = await events.json();

  return data.data.Events;
};

export const getAnnouncements = async () => {
  const query_filter =
    process.env.NODE_ENV === 'development'
      ? `limit: -1, filter: { _or: [
      { status: { _eq: "published" } },
      { status: { _eq: "draft" } }
      ] },
      sort: [ "sort" ]`
      : `limit: -1, filter: { status: { _eq: "published" } }, sort: [ "sort" ]`;
  const announcements = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
      query {
        announcements (${query_filter})
      {
          id
          end_date
          sort
          title
          alt_text
          object_fit
          slide_background
          status
          link_label
          slide_link
          slide {
              filename_disk
          }
          location
      }
    }
        `,
    }),
  });

  const data: AllAnnouncements = await announcements.json();

  return data;
};

export const getSplitScreens = async () => {
  const query_filter =
    process.env.NODE_ENV === 'development'
      ? `limit: -1, filter: { _or: [
      { status: { _eq: "published" } },
      { status: { _eq: "draft" } }
      ] },
      sort: [ "sort" ]`
      : `limit: -1, filter: { status: { _eq: "published" } }, sort: [ "sort" ]`;
  const splitScreens = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
      query {
        split_screens (${query_filter})
      {
          id
          sort
          status
          image {
            filename_disk
          }
          alt
          title
          body
          reverse
      }
    }
        `,
    }),
  });

  const data: AllSplitScreens = await splitScreens.json();

  return data;
};

export const getMinistries = async () => {
  const query_filter =
    process.env.NODE_ENV === 'development'
      ? `limit: -1, filter: { _or: [
      { status: { _eq: "published" } },
      { status: { _eq: "draft" } }
      ] },
      sort: [ "sort" ]`
      : `limit: -1, filter: { status: { _eq: "published" } }, sort: [ "sort" ]`;
  const ministries = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
      query {
        ministries (${query_filter})
      {
          id
          sort
          status
          ministry_image {
            filename_disk
          }
          alt
          title
          description
          leader
          leader_email
      }
    }
        `,
    }),
  });

  const data: AllMinistries = await ministries.json();

  return data;
};

export const getPage = async () => {
  const query_filter =
    process.env.NODE_ENV === 'development'
      ? `limit: -1, filter: { _or: [
      { status: { _eq: "published" } },
      { status: { _eq: "draft" } }
      ] },
      sort: [ "sort" ]`
      : `limit: -1, filter: { status: { _eq: "published" } }, sort: [ "sort" ]`;
  const pages = await fetch('https://srblog.srblife.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.DIRECTUS_TOKEN,
    },
    body: JSON.stringify({
      query: `
      query {
        srb_pages (${query_filter})
        {
          id
          sort
          status
          slug
          srb_pages_sections {
            id
            collection
            item {
            ... on homecards {
              id
              status
              sort
              homecard
            }
          }
        }
      }
    }
   `,
    }),
  });

  const data = await pages.json();

  return data.data.srb_pages as SRBPage[];
};
