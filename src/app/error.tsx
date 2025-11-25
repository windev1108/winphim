'use client';

import InternalErrorImg from '@/assets/images/internal-error.png';
import { ROUTES } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  return (
    <div id='error-container' className='container flex grow flex-col items-center justify-center'>
      <Image
        className='mb-8 max-h-[60px] object-contain md:max-h-[100px] lg:mb-12'
        src={InternalErrorImg}
        alt='Internal server error'
        priority
        quality={100}
      />
      <h1 className='mb-3 text-heading-md lg:mb-4'>Something Went Wrong</h1>
      <p className='mb-4 text-center text-body-sm text-foreground-secondary lg:mb-5'>
        Something went wrong on our end.
        <br /> Most likely a temporary glitch — we're already on it.
      </p>
      <p className='text-center text-body-sm text-foreground-secondary'>
        Try refreshing the page in a moment, or go back to the{' '}
        <Link href={ROUTES.HOME} className='text-primary underline'>
          homepage.
        </Link>
      </p>
    </div>
  );
}
