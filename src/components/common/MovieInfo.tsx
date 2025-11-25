import { IMovie } from '@/api/movie'
import React from 'react'
import { Badge } from '../ui/badge'
import TextWithTooltip from './TextWithTooltip'


interface IMovieInfoProps {
    movie: IMovie
}

const MovieInfo = ({ movie }: IMovieInfoProps) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl xl:text-2xl font-bold text-white max-w-md leading-tight font-serif">
                    {movie?.name}
                </h1>
                <h3 className="text-base xl:text-sm text-secondary-200 max-w-md  font-serif">
                    {movie?.origin_name}
                </h3>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <Badge className='font-semibold' variant={'outline'}>
                    <span>IMDb</span>
                    <span className='text-white'>{movie?.imdb?.vote_average ? movie?.imdb?.vote_average?.toFixed(1) : movie?.tmdb?.vote_average.toFixed(1)}</span>
                </Badge>
                <Badge className='text-secondary-700' variant={'gradient'}>
                    {movie?.quality}
                </Badge>
                <Badge className=' text-white' variant={'outline'}>
                    {movie?.type === 'single' ? 'Phim lẻ' : 'Phim bộ'}
                </Badge>
                <Badge className=' text-white' variant={'outline'}>
                    {movie?.lang}
                </Badge>
                <Badge className=' text-white' variant={'outline'}>
                    {movie?.country[0]?.name}
                </Badge>
                <Badge className=' text-white' variant={'outline'}>
                    {movie?.year}
                </Badge>
            </div>

            {movie?.category?.length > 0 &&
                <div className="flex items-center gap-3 flex-wrap">
                    {movie?.category?.map((item) => (
                        <Badge key={item.id} variant={'secondary'}>
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