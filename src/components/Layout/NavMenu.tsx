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
import { createQueryString } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useYearListQuery } from "@/api/years"


export default function NavMenu() {
  const isMobile = useIsMobile()
  const { data: country } = useCountryListQuery()
  const { data: genre } = useGenreListQuery()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
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
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
          <NavigationMenuContent>
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

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
          <NavigationMenuContent>
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

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-secondary-800 line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
