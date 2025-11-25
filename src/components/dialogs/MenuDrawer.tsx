'use client';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '../Layout/NavMenu';
import { cn, getOrigin } from '@/lib/utils';
import Link from 'next/link';
import BurgerMotion from '../motion/burger-motion';
import { useDeferredValue } from 'react';

const MenuDrawer = ({ className, opened, toggle }: { className?: string, opened: boolean, toggle: () => void }) => {
  const pathname = usePathname();
  const openedDeferred = useDeferredValue(opened)
  return (
    <Drawer open={openedDeferred} onOpenChange={toggle}>
      <DrawerTrigger>
        <BurgerMotion isActive={openedDeferred} />
      </DrawerTrigger>
      <DrawerContent hideOverlay className='h-[calc(100vh-64px)] max-h-screen! border-none rounded-none! bg-secondary-800' >
        <DrawerTitle className='sr-only'></DrawerTitle>
        <motion.nav className={cn('flex flex-col items-center w-full p-5')}>
          {NAV_LINKS.map((link) => {
            const origin = getOrigin(pathname)

            const isActive = origin === link.href || (link.items && link.items.some((i) => origin === i.href));
            return (
              <div
                key={link.href}
                onClick={toggle}
                className='relative w-full'
              >
                {/* Parent link */}
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center text-center px-5 py-2 rounded-full justify-center gap-1 text-nowrap font-normal transition-colors hover:opacity-80',
                    {
                      'text-primary bg-secondary-600': isActive,
                      'pointer-events-none cursor-default': !link.href,
                    },
                    className
                  )}
                >
                  <span className='text-sm'>{link.label.toLowerCase()}</span>
                </Link>

              </div>
            );
          })}
        </motion.nav>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuDrawer