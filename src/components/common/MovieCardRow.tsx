import { IMovie } from '@/api/movie'
import { getImageUrl } from '@/lib/image'
import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TextWithTooltip from './TextWithTooltip'


type CardSize = 'sm' | 'lg'

interface IMovieCardRowProps {
    movie: IMovie
    size: CardSize
    variant?: 'view' | 'watch'
}

const VARIANT_SIZE: Record<CardSize, string> = {
    lg: 'w-20 h-28',
    sm: 'w-14 h-20'
}

const MovieCardRow = ({ variant = 'view', movie, size }: IMovieCardRowProps) => {
    return (
        <Link href={`${variant === 'view' ? ROUTES.PHIM : ROUTES.XEM_PHIM}/${movie?.slug}`} className="flex gap-4 hover:bg-secondary-800 p-3 rounded-lg transition-colors cursor-pointer">
            <div className={`${VARIANT_SIZE[size]} rounded-lg overflow-hidden bg-secondary-700 shrink-0`}>
                {movie.thumb_url ? (
                    <Image
                        src={getImageUrl(movie.thumb_url)}
                        alt={movie.name}
                        quality={90}
                        priority
                        width={200}
                        height={200}
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        🎬
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-start">
                <TextWithTooltip maxLength={28}>
                    {movie.name}
                </TextWithTooltip>
                <TextWithTooltip maxLength={28} className='text-sm text-gray-400'>
                    {movie.origin_name}
                </TextWithTooltip>
            </div>
        </Link>
    )
}

export default MovieCardRow