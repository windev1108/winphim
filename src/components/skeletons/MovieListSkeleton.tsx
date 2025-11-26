import { Skeleton } from '../ui/skeleton'
import MovieCardSkeleton from './MovieCardSkeleton'

const MovieListSkeleton = () => {
    return (
        <section className='relative container py-20'>
            <Skeleton className='xl:w-52 w-1/3 h-8' />
            <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 grid-cols-2  mt-6 gap-6">
                {Array.from({ length: 32 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
            <div className='flex items-center justify-center mt-10'>
                <Skeleton className='xl:w-52 w-1/3 h-12' />
            </div>
        </section>
    )
}

export default MovieListSkeleton