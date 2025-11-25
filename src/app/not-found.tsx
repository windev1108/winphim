import NotFoundImage from '@/assets/images/not-found.png';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/lib/routes';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Page not found - ${siteConfig.name}`,
};

export default function NotFound({ isFullHeight = true }: { isFullHeight?: boolean }) {
  return (
    <div className={`container flex h-full grow flex-col items-center justify-center ${isFullHeight && 'min-h-screen'}`}>
      <Image
        className='mb-8 max-h-[60px] object-contain md:max-h-[100px] lg:mb-12'
        src={NotFoundImage}
        alt='Page not found'
        priority
        quality={100}
      />
      <h1 className='mb-3 text-heading-md lg:mb-4'>Page Not Found</h1>
      <p className='mb-4 text-center text-body-sm text-foreground-secondary lg:mb-5'>
        We couldn't find the page you're looking for.
        <br /> It might have been moved, deleted, or the URL might be incorrect.
      </p>
      <p className='text-center text-body-sm text-foreground-secondary'>
        Please go back to{' '}
        <Link href={ROUTES.HOME} className='text-primary underline'>
          the homepage
        </Link>
      </p>
    </div>
  );
}
