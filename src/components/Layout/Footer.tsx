'use client';

import { Icons } from '@/assets/icons';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-secondary-600 flex items-center justify-center gap-2">
      <span className="text-base text-neutral-400">Powered by </span>
      <Link href="/" >
        <Icons.logoText className='size-28' />
      </Link>
    </footer>
  )
}

export default Footer;
