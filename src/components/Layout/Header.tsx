'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks';
import { useIsMd } from '@/hooks/useMediaQuery';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Icons } from '@/assets/icons';
import NavMenu from './NavMenu';
import MenuDrawer from '../common/MenuDrawer';
import Search from './Search';
import AuthSection from './AuthSection';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';

const Header = () => {
  const isMd = useIsMd();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(scrollY.get());

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScroll.current;

    if (Math.abs(latest - prev) < 10) return;

    setIsScrolled(latest > 100);

    lastScroll.current = latest;
  });

  useLayoutEffect(() => {
    document.body.style.overflow = visibleMenu ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [visibleMenu]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        {
          "bg-background/95 backdrop-blur-md shadow-lg": isScrolled || visibleMenu,
          "bg-transparent": !isScrolled && !visibleMenu
        }
      )}
    >
      <div
        className={cn(
          "relative mx-auto container flex items-center justify-between h-20 w-full transition-all duration-300",
          {
            "xl:rounded-full xl:px-6": isScrolled,
            "xl:px-0": !isScrolled
          }
        )}
      >

        <div className="flex items-center gap-10 justify-between w-full flex-1">
          <div className="flex items-center gap-4">
            {!isMd && <MenuDrawer opened={visibleMenu} toggle={toggleMenu} />}

            <Link href={ROUTES.HOME} onClick={() => visibleMenu && closeMenu()}>
              <Icons.logoText className="xl:block hidden" />
              <Icons.logo className="xl:hidden block" />
            </Link>
          </div>

          <div className='lg:block hidden'>
            <Search />
          </div>

          <div className="relative flex-1 hidden h-full items-center justify-center gap-8 lg:flex">
            <NavMenu />
          </div>

          <AuthSection />
        </div>

      </div>
    </header >
  );
};

export default Header;