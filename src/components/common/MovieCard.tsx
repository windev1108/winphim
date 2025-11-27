import { IMovieItem } from '@/api/movie'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { getImageUrl } from '@/lib/image'
import TextWithTooltip from './TextWithTooltip'

interface MovieCardProps {
    movie: IMovieItem
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link href={`${ROUTES.PHIM}/${movie.slug}`} className='relative group flex flex-col gap-4 cursor-pointer'>
            {/* <div className="group-hover:block hidden absolute inset-0 -translate-x-1/2  h-[400px] w-[350px] z-30 bg-secondary-800 shadow-md rounded-md">

            </div> */}
            {movie?.quality &&
                <div className="absolute top-2 right-2 z-20">
                    <Badge className='' variant={'gradient'}>{movie.quality}</Badge>
                </div>
            }
            <div className='relative group rounded-xl overflow-hidden w-full xl:h-[280px] h-[200px] bg-secondary-900 shadow-md'>
                <Image
                    width={300}
                    height={400}
                    src={getImageUrl(movie?.thumb_url)}
                    alt={movie.name}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                />
                <div className="group-hover:flex hidden absolute inset-0 bg-secondary-800/60 flex-col gap-2 items-center justify-center">
                    <Badge className='text-black font-semibold'>
                        <span className="">IMDb</span>
                        <span className="">{movie.imdb?.vote_average ? movie?.imdb?.vote_average : movie?.tmdb?.vote_average}</span>
                    </Badge>
                    {movie.year &&
                        <Badge variant={'secondary'} >
                            {movie.year}
                        </Badge>
                    }
                    {movie?.category?.length > 0 &&
                        <div className="flex items-center flex-wrap gap-2">
                            {movie?.category?.slice(0, 3).map((c) => (
                                <Badge variant={'secondary'} key={c.id}>{c.name}</Badge>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-col items-center">
                <TextWithTooltip maxLength={18}>
                    {movie.name}
                </TextWithTooltip>
                <TextWithTooltip maxLength={20} className='text-secondary-300 xl:text-sm text-xs'>
                    {movie.origin_name}
                </TextWithTooltip>
            </div>
        </Link>
    )
}

export default MovieCard