'use client';

import { motion, useMotionValueEvent, useScroll, type Easing } from 'motion/react';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks';
import { useIsMd } from '@/hooks/useMediaQuery';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Icons } from '@/assets/icons';
import { Button } from '../ui/button';
import NavMenu from './NavMenu';
import MenuDrawer from '../common/MenuDrawer';

const customEase: Easing = [0.76, 0, 0.24, 1];

const Header = () => {
  const isMd = useIsMd();
  const [visibleHeader, setVisibleHeader] = useState(true);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [visibleMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(scrollY.get());

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScroll.current;

    if (Math.abs(latest - prev) < 10) return;

    setIsScrollDown(latest > 100);

    if (isMd) {
      const scrollingDown = latest > prev;

      // Hide
      if (scrollingDown && latest > 100 && visibleHeader) {
        setVisibleHeader(false);
        if (visibleMenu) closeMenu();
      }

      // Show
      if (!scrollingDown && !visibleHeader) {
        setVisibleHeader(true);
      }
    } else {
      // Mobile: header always display
      if (!visibleHeader) setVisibleHeader(true);
    }

    lastScroll.current = latest;
  });

  useLayoutEffect(() => {
    document.body.style.overflow = visibleMenu ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [visibleMenu]);

  return (
    <motion.header
      animate={visibleHeader ? "visible" : "hidden"}
      initial="visible"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-140%" }
      }}
      transition={{ duration: 0.5, ease: customEase }}
      className={cn("fixed z-50 w-full", {
        "top-0": !isScrollDown,
        "xl:top-2 top-0": isScrollDown
      })}
      style={{ willChange: "transform" }}
    >
      <div
        className={cn(
          "relative mx-auto container flex items-center justify-between xl:h-20 h-16 w-full xl:rounded-full transition-colors duration-300",
          {
            "bg-background": isScrollDown || visibleMenu,
            "shadow-none!": visibleMenu
          }
        )}
      >
        <div className="flex items-center gap-10 justify-between w-full flex-1">
          <div className="flex items-center gap-4">
            {!isMd && <MenuDrawer opened={visibleMenu} toggle={toggleMenu} />}

            <Link href={ROUTES.HOME} onClick={() => visibleMenu && closeMenu()}>
              <Icons.logo className="xl:block hidden" />
              <Icons.logoMb className="xl:hidden block" />
            </Link>
          </div>

          <div className="relative flex-1 hidden h-full items-center justify-center gap-8 lg:flex">
            <NavMenu />
          </div>
        </div>

        <Button className="xl:min-w-[146px] min-w-[113px] rounded-full">{'Login'}</Button>
      </div>
    </motion.header>
  );
};

export default Header;
