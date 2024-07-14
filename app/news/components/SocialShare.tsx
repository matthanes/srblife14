'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';

import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
} from 'react-share';

type SocialShareProps = {
  title: string;
  base_url: string;
  size: number;
};

const SocialShare: React.FC<SocialShareProps> = ({title, base_url, size, }) => {
  const path = usePathname();
  return (
    <div className="flex items-center gap-2">
      {/* <span className='mr-3 font-bold'>Share:</span> */}
      <FacebookShareButton url={`${base_url}${path}?utm_campaign=blog_post&utm_medium=social&utm_source=facebook`}>
        <FacebookIcon size={size} round={true}></FacebookIcon>
      </FacebookShareButton>
      <TwitterShareButton
        title={title}
        url={`${base_url}${path}?utm_campaign=blog_post&utm_medium=social&utm_source=twitter`}
        hashtags={['SRBLife']}
      >
        <TwitterIcon size={size} round={true}></TwitterIcon>
      </TwitterShareButton>
      <RedditShareButton url={`${base_url}${path}?utm_campaign=blog_post&utm_medium=social&utm_source=reddit`} title={title}>
        <RedditIcon size={size} round={true}></RedditIcon>
      </RedditShareButton>
      <EmailShareButton
        subject={`SRBLife: ${title}`}
        body="I thought you might like this article I found:"
        url={`${base_url}${path}?utm_campaign=blog_post&utm_medium=email&utm_source=email`}
      >
        <EmailIcon size={size} round={true}></EmailIcon>
      </EmailShareButton>
    </div>
  );
};

export default SocialShare;
