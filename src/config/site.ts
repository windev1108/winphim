import { env } from "./env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  appUrl: env.NEXT_PUBLIC_APP_URL,
  name: 'Win Phim',
  metaTitle: 'Winphim app meta title',
  description:
    'Winphim app description',
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
};
