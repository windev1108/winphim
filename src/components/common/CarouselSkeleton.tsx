import { Fragment } from 'react/jsx-runtime'
import { Skeleton } from '../ui/skeleton'

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
              <div className='flex flex-col gap-4 xl:h-[360px] h-48 xl:w-[255.98px] w-[138px] '>
                <Skeleton className='flex-1 overflow-hidden rounded-lg w-full cursor-pointer' />
                <Skeleton className='h-4 w-1/2' />
              </div>
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