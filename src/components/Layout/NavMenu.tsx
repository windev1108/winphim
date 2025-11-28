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

interface INavMenuProps {
  direction?: 'row' | 'column'
}

export default function NavMenu({ direction = 'row' }: INavMenuProps) {
  const isMobile = useIsMobile()
  const { data: country } = useCountryListQuery()
  const { data: genre } = useGenreListQuery()

  return (
    <NavigationMenu viewport={isMobile} className="max-w-full!">
      <NavigationMenuList className={cn(`max-w-full flex flex-wrap items-center justify-center ${direction === 'column' ? 'flex-col' : 'flex-row'}`)}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`${ROUTES.PHIM}?category=phim-le`}>Phim lẻ</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`${ROUTES.PHIM}?category=phim-bo`}>Phim bộ</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`${ROUTES.PHIM}?category=phim-chieu-rap`}>Phim chiếu rạp</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="md:block hidden">
          <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
          <NavigationMenuContent className="border-secondary-700">
            <div className="grid grid-cols-4 w-[500px] gap-4">
              {genre?.items?.map((item) => (
                <NavigationMenuLink key={item._id} asChild>
                  <Link href={`${ROUTES.PHIM}?genre=${item.slug}`} className="hover:bg-secondary-700">
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="md:block hidden">
          <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
          <NavigationMenuContent className="border-secondary-700">
            <div className="grid grid-cols-4 w-[500px] gap-4">
              {country?.items?.map((item) => (
                <NavigationMenuLink key={item._id} asChild>
                  <Link href={`${ROUTES.PHIM}?country=${item.slug}`} className="hover:bg-secondary-700">
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu >
  )
}
