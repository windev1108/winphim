import { Skeleton } from '../ui/skeleton'

const MovieCardSkeleton = () => {
    return (
        <div className='flex flex-col gap-5 w-full'>
            <Skeleton className='xl:h-[280px] h-[200px] w-full rounded-xl' />
            <div className="flex flex-col gap-1 items-center">
                <Skeleton className='h-5 w-full' />
                <Skeleton className='h-4 w-1/2' />
            </div>
        </div>
    )
}

export default MovieCardSkeleton