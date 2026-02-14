"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useIsMobile } from "@/hooks"
import { ROUTES } from "@/lib/routes"
import { useCountryListQuery } from "@/api/country"
import { useGenreListQuery } from "@/api/genre"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

interface INavMenuProps {
  direction?: 'row' | 'column'
}

interface NavLinkItem {
  href: string;
  label: string;
}


export interface NavLink {
  href: string;
  label: string;
  items?: NavLinkItem[];
}




export default function NavMenu({ direction = 'row' }: INavMenuProps) {
  const isMobile = useIsMobile()
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
    <NavigationMenu viewport={isMobile} className="max-w-full!">
      <NavigationMenuList className={cn(`max-w-full flex flex-nowrap items-center justify-center ${direction === 'column' ? 'flex-col' : 'flex-row'}`)}>
        {NAV_LINKS.map((item) => (
          <React.Fragment key={item.label}>
            {item?.items?.length! > 0 ?
              <NavigationMenuItem className="md:block hidden">
                <NavigationMenuTrigger className="lg:text-base text-xs">{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="border-secondary-700 left-1/2 transform -translate-x-1/2">
                  <div className="grid grid-cols-4 w-[90vw] max-w-[500px] gap-4 mx-auto overflow-visible">
                    {item?.items?.map((x) => {
                      const isActive = x.href.includes(countryQuery! || genreQuery!)
                      return (
                        <NavigationMenuLink key={x.href} asChild>
                          <Link href={`${ROUTES.MOVIE}${x.href}`} className={`lg:text-base text-xs lg:p-4 md:p-0.5! p-1! hover:bg-secondary-700 ${isActive && 'bg-secondary-800'}`}>
                            {x.label}
                          </Link>
                        </NavigationMenuLink>
                      )
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              :
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${item.href.includes(categoryQuery!) && 'bg-secondary-800! hover:bg-secondary-700!'} ${navigationMenuTriggerStyle()}`}>
                  <Link className="lg:text-base text-xs" href={`${ROUTES.MOVIE}?category=${item.href}`}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            }
          </React.Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu >
  )
}
