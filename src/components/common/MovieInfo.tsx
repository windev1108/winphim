import { IMovie, useCommentByMoviesQuery } from '@/api/movie'
import React from 'react'
import { Badge } from '../ui/badge'
import TextWithTooltip from './TextWithTooltip'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'


interface IMovieInfoProps {
    movie: IMovie
}

const MovieInfo = ({ movie }: IMovieInfoProps) => {
    const router = useRouter()
    const { data: comments } = useCommentByMoviesQuery({
        params: {
            movieSlug: movie?.slug
        },
        options: {
            enabled: !!movie?.slug
        }
    })
    const ratings: number[] = Array.isArray(comments)
        ? comments
            .map((x) => {
                const n = Number(x?.rating)
                return isNaN(n) ? undefined : n
            })
            .filter((r): r is number => typeof r === 'number')
        : []

    const commentAvg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : undefined

    const computedRating = (() => {
        const imdbVal = Number(movie?.imdb?.vote_average)
        const tmdbVal = Number(movie?.tmdb?.vote_average)

        if (!isNaN(imdbVal) && imdbVal > 0) return imdbVal
        if (!isNaN(tmdbVal) && tmdbVal > 0) return tmdbVal
        if (typeof commentAvg === 'number' && !isNaN(commentAvg)) {
            // If any comment rating > 5, assume comments are already on a /10 scale;
            // otherwise assume comments are on a /5 scale and scale to /10.
            const hasAboveFive = ratings.some((r) => r > 5)
            return hasAboveFive ? commentAvg : commentAvg * 2
        }

        return undefined
    })()

    const ratingDisplay = computedRating != null ? computedRating.toFixed(1) : 'N/A'
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-2">
                <TextWithTooltip maxLength={90} className="text-xl xl:text-2xl font-bold text-white max-w-md leading-tight font-serif">
                    {movie?.name}
                </TextWithTooltip>
                <TextWithTooltip maxLength={80} className="text-base xl:text-sm text-secondary-200 max-w-md">
                    {movie?.origin_name}
                </TextWithTooltip>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                {Boolean(ratingDisplay !== '0.0' && ratingDisplay !== 'N/A') &&
                    <Badge className='font-semibold' variant={'outline'}>
                        <span>IMDb</span>
                        <span className='text-white'>{ratingDisplay}</span>
                    </Badge>
                }
                <Badge className='text-secondary-700' variant={'gradient'}>
                    {movie?.quality}
                </Badge>
                <Badge onClick={() => router.push(`${ROUTES.MOVIE}?category=${movie?.type === 'single' ? 'phim-le' : 'phim-bo'}`)} className='hover:bg-secondary-500 text-white' variant={'outline'}>
                    {movie?.type === 'single' ? 'Phim lẻ' : 'Phim bộ'}
                </Badge>
                <Badge className=' text-white' variant={'outline'}>
                    {movie?.lang}
                </Badge>

                <Badge onClick={() => router.push(`${ROUTES.MOVIE}?year=${movie?.year}`)} className='hover:bg-secondary-500 text-white cursor-pointer' variant={'outline'}>
                    {movie?.year}
                </Badge>
            </div>
            {movie?.country?.length > 0 &&
                <div className="flex items-center gap-3 flex-wrap">
                    {movie?.country?.map((item) => (
                        <Badge onClick={() => router.push(`${ROUTES.MOVIE}?country=${item?.slug}`)} key={item.id} variant={'outline'} className='hover:bg-secondary-500 text-secondary-100 cursor-pointer'>
                            {item?.name}
                        </Badge>
                    ))}
                </div>
            }
            {movie?.category?.length > 0 &&
                <div className="flex items-center gap-3 flex-wrap">
                    {movie?.category?.map((item) => (
                        <Badge className='hover:bg-secondary-500 cursor-pointer' onClick={() => router.push(`${ROUTES.MOVIE}?genre=${item?.slug}`)} key={item.id} variant={'secondary'}>
                            {item?.name}
                        </Badge>
                    ))}
                </div>
            }
            {/* Description */}
            <TextWithTooltip maxLength={245} className="max-w-xl text-secondary-200 text-sm" html={movie?.content} />
        </div>
    )
}

export default MovieInfo