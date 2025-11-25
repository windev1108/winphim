'use client';

import { cn, getOrigin } from '@/lib/utils';
import { AnimatePresence, type Variants, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/lib/routes';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const dropdownVars: Variants = {
  hidden: { y: -15, opacity: 0, x: '-50%' },
  visible: {
    y: 0,
    x: '-50%',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: customEase,
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    y: -15,
    x: '-50%',
    opacity: 0,
    transition: { duration: 0.3, ease: customEase },
  },
};

const childVars: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: customEase } },
};

interface NavLinkItem {
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  items?: NavLinkItem[];
}

export const NAV_LINKS: NavLink[] = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.MOVIE, label: 'Movies' },
  { href: ROUTES.TV, label: 'TV Show' },
];


interface Props {
  className?: string;
  navClassName?: string;
  visibleHeader?: boolean;
}

export default function NavMenu({ className, visibleHeader }: Props) {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.nav className={cn('flex flex-1 items-center justify-center')}>
      {NAV_LINKS.map((link, idx) => {
        const hasSub = link.items && link.items.length > 0;
        const origin = getOrigin(pathname)
        const isActive = origin === link.href || (link.items && link.items.some((i) => origin === i.href));

        return (
          <div
            key={link.href}
            className='relative'
            onMouseEnter={() => hasSub && setOpenIdx(idx)}
            onMouseLeave={() => hasSub && setOpenIdx(null)}
          >
            {/* Parent link */}
            <Link
              href={link.href}
              className={cn(
                'flex items-center px-5 py-2 rounded-full justify-center gap-1 text-nowrap font-normal transition-colors hover:opacity-80',
                {
                  'text-primary bg-secondary-600': isActive,
                  'pointer-events-none cursor-default': !link.href,
                },
                className
              )}
            >
              <span className='text-sm'>{link.label}</span>
            </Link>

            {/* Dropdown */}
            <AnimatePresence>
              {visibleHeader && hasSub && openIdx === idx && link.items && (
                <motion.div
                  variants={dropdownVars}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  className={cn(
                    '-translate-x-1/2 absolute top-[calc(100%+14px)] left-1/2 mt-3 w-56 rounded-2xl p-3 shadow-lg bg-bg-brand-section',
                  )}
                >
                  {link.items.map((sub) => (
                    <motion.div key={sub.href} variants={childVars}>
                      <Link
                        href={sub.href}
                        className={cn('block rounded-xl px-4 py-3 font-medium transition-colors text-text-secondary-on-brand hover:text-white text-white', className)}
                      >
                        {sub.label}
                      </Link>
                    </motion.div>
                  ))}

                  <div className='-top-7 absolute left-0 h-7 w-full'></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.nav>
  );
}
