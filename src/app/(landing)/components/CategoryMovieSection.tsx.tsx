import { useMovieListQuery } from '@/api/movie'
import CarouselSkeleton from '@/components/skeletons/CarouselSkeleton'
import CarouselWithControls from '@/components/common/CarouselWithControls'
import MovieCard from '@/components/common/MovieCard'
import { useIntersection, useIsMd, useIsMobile, useIsLg } from '@/hooks'

interface MovieCategorySectionProps {
    category: string
    title: string
}


const categoriesList = ['phim-moi', 'phim-chieu-rap', 'phim-le', 'phim-bo', 'phim-sap-chieu', 'tv-shows']
const CategoryMovieSection = ({ category, title }: MovieCategorySectionProps) => {
    const isMd = useIsMd()
    const isMb = useIsMobile()
    const isLg = useIsLg()

    const genSize = () => {
        if (isMb) return 2
        if (isLg) return 8
        if (isMd) return 6
        return 8
    }
    const { ref, isIntersecting } = useIntersection()
    const { data, isFetching } = useMovieListQuery({
        params: {
            slug: categoriesList.includes(category) ? category : '',
            category: !categoriesList.includes(category) ? category : '',
            sort_type: 'desc',
            limit: 20
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
                    itemsToShow={genSize()}
                    gap={isMb ? 8 : 10}
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