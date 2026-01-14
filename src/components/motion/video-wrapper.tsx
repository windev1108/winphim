'use client';

import { Icons } from '@/assets/icons';
import { getYoutubeEmbedUrl } from '@/lib/utils';
import { PlayCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';

export interface VideoPlayerProps {
  videoUrl: string;
  title?: string
  className?: string;
  children?: ReactNode
  disabled?: boolean
  variant?: 'video' | 'iframe'
}

const VideoWrapper: React.FC<VideoPlayerProps> = ({ children, disabled, title, videoUrl, className, variant = 'iframe' }) => {
  return (
    <Dialog>
      <DialogTrigger disabled={disabled}>
        {children}
      </DialogTrigger>
      {/* Modal Overlay */}
      <DialogContent className='xl:min-w-[1000px] min-w-[95vw] aspect-video  p-0 xl:rounded-xl overflow-hidden'>
        <DialogTitle className='sr-only'></DialogTitle>
        {variant === 'video' ?
          <video src={videoUrl} controls autoPlay className='h-full w-full object-cover' />
          :
          <iframe className='w-full h-full' width="500" height="500" src={getYoutubeEmbedUrl(videoUrl) ?? videoUrl} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        }
      </DialogContent>
    </Dialog>
  );
};

export default VideoWrapper;
