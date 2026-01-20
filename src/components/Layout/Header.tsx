'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { use, useLayoutEffect, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks';
import { useIs4xl, useIs5xl, useIsMd, useIsMobile } from '@/hooks/useMediaQuery';
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
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(scrollY.get());
  const is5xl = useIs5xl();
  const is4xl = useIs4xl();

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
            {/* {!isMd && <MenuDrawer opened={visibleMenu} toggle={toggleMenu} />} */}
            {Boolean(is5xl || is4xl || isMobile) &&
              <MenuDrawer opened={visibleMenu} toggle={toggleMenu} />
            }

            <Link href={ROUTES.HOME} onClick={() => visibleMenu && closeMenu()}>
              <Icons.logoText className="2xl:block hidden" />
              <Icons.logo className="2xl:hidden block" />
            </Link>
          </div>

          {!Boolean(is5xl || is4xl || isMobile) &&
            <Search />
          }

          {!Boolean(is5xl || is4xl || isMobile) &&
            <div className="relative flex-1 h-full items-center justify-center gap-8">
              <NavMenu />
            </div>
          }

          <AuthSection />
        </div>

      </div>
    </header >
  );
};

export default Header;