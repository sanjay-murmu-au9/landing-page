'use client';

import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon
} from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const iconSize = 32;
  const round = true;

  return (
    <div className="flex items-center flex-wrap gap-4">
      <span className="text-gray-700 font-medium mr-2">Share:</span>
      
      <FacebookShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
        <FacebookIcon size={iconSize} round={round} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
        <TwitterIcon size={iconSize} round={round} />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
        <WhatsappIcon size={iconSize} round={round} />
      </WhatsappShareButton>

      <LinkedinShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
        <LinkedinIcon size={iconSize} round={round} />
      </LinkedinShareButton>

      <TelegramShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
        <TelegramIcon size={iconSize} round={round} />
      </TelegramShareButton>

      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }}
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy Link
      </button>
    </div>
  );
}
