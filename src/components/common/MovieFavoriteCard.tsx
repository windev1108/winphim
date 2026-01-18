import { addMovieFavoriteRequest, IMovieFavorite, IMovieItem, removeMovieFavoriteRequest } from '@/api/movie'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { getImageUrl } from '@/lib/image'
import TextWithTooltip from './TextWithTooltip'
import PixelTransition from '../reactbit/PixelTransition'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { DeleteIcon, Heart, Info, PlayIcon, TrashIcon } from 'lucide-react'
import TooltipWrapper from './TooltipWrapper'
import { getMutateError, mappingMovieType } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast, { LoaderIcon } from 'react-hot-toast'

interface MovieFavoriteCardProps {
    movie: IMovieFavorite
}

const MovieFavoriteCard = ({ movie }: MovieFavoriteCardProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutateAsync: removeMovieFavorite, isPending } = useMutation({
        mutationFn: removeMovieFavoriteRequest
    })

    const handleRemoveFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            await removeMovieFavorite({ movieId: movie.id })
            queryClient.invalidateQueries({ queryKey: ['movie/my-favorites'] })
            toast.success('Đã xóa khỏi danh sách yêu thích')
        } catch (error) {
            getMutateError(error)
        }
    }

    const handleCardClick = () => {
        router.push(`${ROUTES.MOVIE}/${movie.slug}`)
    }


    return (
        <div className='relative group flex flex-col gap-4 cursor-pointer' onClick={handleCardClick}>
            <div className="flex flex-col bg-secondary-800 h-full w-full z-20 rounded-xl overflow-hidden">
                <div className="group relative xl:h-[300px] h-[200px]">
                    <Image
                        width={1000}
                        height={1000}
                        src={getImageUrl(movie?.thumb_url)}
                        alt={movie?.name}
                        className='object-cover w-full h-full'
                    />
                    <div
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                        className='xl:block hidden absolute inset-0 opacity-0 group-hover:opacity-100 bg-secondary-800 transition-all duration-300 ease-in-out z-10'
                    >
                        <div className='h-1/2'>
                            <Image
                                alt={movie?.name}
                                src={getImageUrl(movie?.poster_url)}
                                className='w-full h-full object-cover'
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className='h-1/2 p-2 flex flex-col gap-2'>
                            <div className="flex gap-1 flex-wrap flex-1">
                                {(movie?.imdb?.vote_average > 0 || movie?.tmdb?.vote_average > 0) &&
                                    <Badge className='h-5 font-semibold cursor-pointer' variant={'outline'}>
                                        <span className='text-[11px]'>IMDb</span>
                                        <span className='text-[10px] text-white'>
                                            {movie?.imdb?.vote_average
                                                ? movie?.imdb?.vote_average?.toFixed(1)
                                                : movie?.tmdb?.vote_average.toFixed(1)}
                                        </span>
                                    </Badge>
                                }
                                <Badge className='h-5 text-[10px] text-secondary-700 cursor-pointer' variant={'gradient'}>
                                    {movie?.quality}
                                </Badge>
                                <Badge className='h-5 text-[10px] text-white cursor-pointer' variant={'secondary'}>
                                    {mappingMovieType(movie?.type)}
                                </Badge>
                                <Badge className='h-5 text-[10px] text-white cursor-pointer' variant={'secondary'}>
                                    {movie?.lang}
                                </Badge>
                                <Badge className='h-5 text-[10px] text-white cursor-pointer' variant={'secondary'}>
                                    {movie?.year}
                                </Badge>
                                {movie?.country?.length > 0 &&
                                    <Badge className='h-5 text-[10px] text-white cursor-pointer' variant={'secondary'}>
                                        {movie?.country}
                                    </Badge>
                                }
                                {movie?.category?.length > 0 &&
                                    <Badge className='h-5 text-[10px] text-white cursor-pointer' variant={'secondary'}>
                                        {movie?.category}
                                    </Badge>
                                }
                            </div>
                            <div className="flex gap-3 justify-around">
                                <TooltipWrapper content='Xem phim'>
                                    <Link
                                        href={`${ROUTES.WATCHING_MOVIE}/${movie?.slug}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Button className='text-sm font-medium' variant={'outline'} size={'icon-lg'}>
                                            <PlayIcon size={18} className='text-white' />
                                        </Button>
                                    </Link>
                                </TooltipWrapper>
                                <TooltipWrapper content='Thông tin'>
                                    <Link
                                        href={`${ROUTES.MOVIE}/${movie?.slug}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Button className='text-sm font-medium' variant={'outline'} size={'icon-lg'}>
                                            <Info size={18} />
                                        </Button>
                                    </Link>
                                </TooltipWrapper>
                                <TooltipWrapper content='Thêm vào yêu thích'>
                                    <Button
                                        disabled={isPending}
                                        onClick={handleRemoveFavorite}
                                        className='font-medium'
                                        variant={'outline'}
                                        size={'icon-lg'}
                                    >
                                        {isPending ? <LoaderIcon /> : <Heart />}
                                    </Button>
                                </TooltipWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center rounded-xl">
                <TextWithTooltip maxLength={18}>
                    {movie.name}
                </TextWithTooltip>
                <TextWithTooltip maxLength={20} className='text-secondary-300 xl:text-sm text-xs'>
                    {movie.origin_name}
                </TextWithTooltip>
            </div>
        </div>
    )
}

export default MovieFavoriteCard