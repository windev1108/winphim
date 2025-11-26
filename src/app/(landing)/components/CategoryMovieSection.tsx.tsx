import { useMovieListQuery } from '@/api/movie'
import CarouselSkeleton from '@/components/skeletons/CarouselSkeleton'
import CarouselWithControls from '@/components/common/CarouselWithControls'
import MovieCard from '@/components/common/MovieCard'
import { useIntersection, useIsMobile } from '@/hooks'

interface MovieCategorySectionProps {
    category: string
    title: string
}

const CategoryMovieSection = ({ category, title }: MovieCategorySectionProps) => {
    const isMb = useIsMobile()
    const { ref, isIntersecting } = useIntersection()
    const { data, isFetching } = useMovieListQuery({
        params: {
            slug: category
        },
        options: {
            enabled: !!isIntersecting
        }
    })
    return (
        <section ref={ref} className='container'>
            {isFetching ?
                <CarouselSkeleton />
                :
                <CarouselWithControls
                    itemsToShow={isMb ? 3 : 6}
                    gap={isMb ? 8 : 16}
                    title={title}
                    items={data?.items ?? []}
                    titleClassName="xl:text-2xl text-lg italic"
                    renderItem={(item) => (
                        <MovieCard key={item._id} movie={item} />
                    )}
                />
            }
        </section>
    )
}

export default CategoryMovieSection