export type DirectusSchema = {
  Events: SRBEvent[];
  announcements: Announcement[];
  authors: Author[];
  blog_posts: Post[];
  ministries: Ministry[];
  split_screens: SplitScreen[];
};

export type DirectusFile = {
  id: string;
  filename_disk: string;
};

export type Author = {
  name: string;
  bio?: string;
  profile_pic?: {
    filename_disk: string;
    description: string;
  };
};

export type AllAuthors = {
  authors: Author[];
};

export type Tag = {
  tag_name: string;
};

export type Post = {
  title: string;
  description: string;
  post: string;
  publish_date: string;
  author: Author;
  tags: Tag[];
  slug: string;
  social_media_image?: {
    filename_disk: string;
    description: string;
  };
};

export type AllPosts = {
  data: {
    blog_posts: Post[];
  };
};

export type SRBEvent = {
  id: string;
  title: string;
  status: string;
  category: string;
  datetime: string;
  short_description: string;
  event_location: string;
  button_link?: string;
  button_text?: string;
  location: string;
};

export type AllSRBEvents = {
  data: {
    Events: SRBEvent[];
  };
};

export type Announcement = {
  id: string;
  sort?: string;
  title: string;
  subtitle: string;
  alt_text: string;
  status: string;
  link_label?: string;
  slide_link?: string;
  slide: {
    filename_disk: string;
  };
  location: string;
};

export type AllAnnouncements = {
  data: {
    announcements: Announcement[];
  };
};

export type SplitScreen = {
  id: string;
  sort: string;
  status: string;
  image: {
    filename_disk: string;
  };
  alt: string;
  title: string;
  body: string;
  reverse: boolean;
};

export type AllSplitScreens = {
  data: {
    split_screens: SplitScreen[];
  };
};

export type Ministry = {
  id: string;
  sort: string;
  status: string;
  ministry_image: {
    filename_disk: string;
  };
  alt: string;
  title: string;
  description: string;
  leader: string;
  leader_email: string;
};

export type AllMinistries = {
  data: {
    ministries: Ministry[];
  };
};

