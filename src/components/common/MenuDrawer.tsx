'use client';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { usePathname, useSearchParams } from 'next/navigation';
import BurgerMotion from '../motion/burger-motion';
import React, { useDeferredValue } from 'react';
import { ROUTES } from '@/lib/routes';
import Search from '../Layout/Search';
import { motion } from 'motion/react'
import { cn, getOrigin } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { NavLink } from '../Layout/NavMenu';
import { useCountryListQuery } from '@/api/country';
import { useGenreListQuery } from '@/api/genre';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const MenuDrawer = ({ className, opened, toggle }: { className?: string, opened: boolean, toggle: () => void }) => {
  const openedDeferred = useDeferredValue(opened)
  const { data: country } = useCountryListQuery()
  const { data: genre } = useGenreListQuery()
  const searchParams = useSearchParams()
  const categoryQuery = searchParams.get('category')
  const genreQuery = searchParams.get('genre')
  const countryQuery = searchParams.get('country')
  const NAV_LINKS: NavLink[] = [
    {
      href: 'phim-le', label: 'Phim lẻ'
    },
    { href: 'phim-bo', label: 'Phim bộ' },
    { href: 'phim-chieu-rap', label: 'Phim chiếu rạp' },
    {
      href: '/', label: 'Thể loại', items: genre?.items?.map((x) => ({ href: `?genre=${x.slug}`, label: x.name })) ?? []
    },
    {
      href: '/', label: 'Quốc gia', items: country?.items?.map((x) => ({ href: `?country=${x.slug}`, label: x.name })) ?? []
    },
  ];

  return (
    <Drawer open={openedDeferred} onOpenChange={toggle}>
      <DrawerTrigger asChild>
        <BurgerMotion isActive={openedDeferred} />
      </DrawerTrigger>
      <DrawerContent
        onWheel={(e) => e.stopPropagation()}
        hideOverlay className='h-[calc(100vh-80px)] max-h-screen! overflow-y-auto border-none rounded-none! bg-secondary-800'>
        <DrawerTitle className='sr-only'></DrawerTitle>
        <div className="flex flex-col w-full p-4">
          <Search onClose={() => toggle()} />

          <motion.nav className={cn('flex flex-col items-center w-full p-5 gap-2')}>
            {NAV_LINKS.map((link) => {
              const isActive = categoryQuery === link.href
              console.log('categoryQuery :', categoryQuery)
              return (
                <React.Fragment>
                  {link.items?.length! > 0 ?
                    <Accordion
                      type="multiple"
                      className="w-full"
                    >
                      <AccordionItem value={link.label} className='px-4'>
                        <AccordionTrigger className='py-2'>{link.label}</AccordionTrigger>
                        <AccordionContent className="grid grid-cols-3 gap-2">
                          {link.items?.map((item) => {
                            const isActive = item.href.includes(countryQuery! || genreQuery!)
                            return (
                              <Link
                                onClick={toggle}
                                href={item.href} key={item.href} className={`p-2 text-center hover:bg-secondary-700 rounded-full ${isActive && 'bg-secondary-700'}`} >
                                {item.label}
                              </Link>
                            )
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    :
                    <div
                      key={link.href}
                      onClick={toggle}
                      className={`relative w-full rounded-xl text-sm px-4 py-2 ${isActive && 'bg-secondary-700'}`}
                    >
                      {/* Parent link */}
                      <Link
                        href={`${ROUTES.MOVIE}?category=${link?.href}`}
                        className={cn(
                          className
                        )}
                      >
                        {link.label}
                      </Link>

                    </div>
                  }
                </React.Fragment>
              );
            })}
          </motion.nav>
        </div>
      </DrawerContent>
    </Drawer >
  )
}

export default MenuDrawer