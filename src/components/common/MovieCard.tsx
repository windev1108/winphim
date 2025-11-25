import { IMovieItem } from '@/api/movie'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { getImageUrl } from '@/lib/image'

interface MovieCardProps {
    movie: IMovieItem
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link href={`${ROUTES.MOVIE}/${movie.slug}`} className='relative flex flex-col gap-4 cursor-pointer'>
            <div className='relative group rounded-xl overflow-hidden w-full bg-secondary-900 shadow-md xl:h-[360px] h-48'>
                <Image
                    width={300}
                    height={400}
                    src={getImageUrl(movie?.thumb_url)}
                    alt={movie.name}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                />
                <div className="group-hover:flex hidden absolute inset-0 bg-secondary-800/60 flex-col gap-2 items-center justify-center">
                    <div className="flex items-center gap-2">
                        <span className="bg-yellow-500 text-black px-2 py-0.5 text-xs font-bold rounded">IMDb</span>
                        <span className="text-white font-semibold text-sm">{movie.imdb?.vote_average ? movie?.imdb?.vote_average?.toFixed(1) : ''}</span>
                    </div>
                    {movie.year &&
                        <Badge variant={'secondary'} >
                            {movie.year}
                        </Badge>
                    }
                    <span className="text-gray-300 text-sm">{ }</span>
                </div>
            </div>
            <span className='text-white max-w'>{movie.name}</span>
        </Link>
    )
}

export default MovieCard