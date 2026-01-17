import { ROUTES } from "./routes"

export const BREAKPOINTS = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
}

export const IMAGES = {
    HERO: '/images/landing/banner.webp',
}

export const MAPPING_QUERY_FIELDS: Record<string, string> = {
    newest: '_id',
    newly_updated: 'modified.time',
    imdb: 'year'

}

export const PROTECTED_ROUTES = [ROUTES.MY_MOVIE, ROUTES.MY_REVIEWS]