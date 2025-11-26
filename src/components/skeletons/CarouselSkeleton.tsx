import { Fragment } from 'react/jsx-runtime'
import { Skeleton } from '../ui/skeleton'
import MovieCardSkeleton from './MovieCardSkeleton'

interface SkeletonRowSectionProps {
  variant?: 'movie' | 'actor'
}

const SkeletonRowSection = ({ variant = 'movie' }: SkeletonRowSectionProps) => {
  return (
    <div className='flex flex-col'>
      <Skeleton className='h-8 w-52 mb-4' />
      <div className='grid xl:grid-cols-6 grid-cols-3 xl:gap-4 gap-2'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Fragment key={i}>
            {variant === 'movie' ?
              <MovieCardSkeleton />
              :
              <div className='flex flex-col gap-4 items-center justify-center'>
                <Skeleton className='w-40 h-40 rounded-full' />
                <Skeleton className='h-5 w-1/2' />
                <Skeleton className='h-5 w-1/3' />
              </div>
            }
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default SkeletonRowSection