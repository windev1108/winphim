import { IMovie } from '@/api/movie'
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
                <Badge className='font-semibold' variant={'outline'}>
                    <span>IMDb</span>
                    <span className='text-white'>{movie?.imdb?.vote_average ? movie?.imdb?.vote_average?.toFixed(1) : movie?.tmdb?.vote_average.toFixed(1)}</span>
                </Badge>
                <Badge className='text-secondary-700' variant={'gradient'}>
                    {movie?.quality}
                </Badge>
                <Badge onClick={() => router.push(`${ROUTES.MOVIE}?category=${movie?.type === 'single' ? 'phim-le' : 'phim-bo'}`)} className='hover:bg-primary hover:text-black cursor-pointer text-white' variant={'outline'}>
                    {movie?.type === 'single' ? 'Phim lẻ' : 'Phim bộ'}
                </Badge>
                <Badge className=' text-white' variant={'outline'}>
                    {movie?.lang}
                </Badge>

                <Badge onClick={() => router.push(`${ROUTES.MOVIE}?year=${movie?.year}`)} className='hover:bg-primary hover:text-black cursor-pointer text-white' variant={'outline'}>
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