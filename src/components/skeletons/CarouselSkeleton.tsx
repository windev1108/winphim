import { Fragment } from 'react/jsx-runtime'
import { Skeleton } from '../ui/skeleton'
import MovieCardSkeleton from './MovieCardSkeleton'
import { useIsMobile } from '@/hooks'

interface SkeletonRowSectionProps {
  variant?: 'movie' | 'actor'
}

const SkeletonRowSection = ({ variant = 'movie' }: SkeletonRowSectionProps) => {
  const isMb = useIsMobile()
  return (
    <div className='flex flex-col'>
      <Skeleton className='h-8 w-52 mb-4' />
      <div className='grid xl:grid-cols-8 grid-cols-2 xl:gap-5 gap-2'>
        {Array.from({ length: isMb ? 2 : 8 }).map((_, i) => (
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