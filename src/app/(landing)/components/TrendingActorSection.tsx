import { usePeopleList } from '@/api/people'
import ProfileCard from '@/components/common/ProfileCard'
import CarouselSkeleton from '@/components/common/CarouselSkeleton'
import CarouselWithControls from '@/components/common/CarouselWithControls'
import { useIntersection, useIsMobile } from '@/hooks'



const TrendingActorSection = () => {
    const isMb = useIsMobile()
    const { ref, isIntersecting } = useIntersection()
    const { data: persons, isFetching } = usePeopleList({ page: 1 }, { enabled: isIntersecting });
    return (
        <section ref={ref} className='container'>
            {isFetching ?
                <CarouselSkeleton variant='actor' />
                :
                <CarouselWithControls
                    itemsToShow={isMb ? 3 : 6}
                    gap={isMb ? 8 : 16}
                    title={'Popular Actors'}
                    items={persons?.items ?? []}
                    titleClassName="xl:text-2xl text-lg italic"
                    renderItem={(item) => (
                        <ProfileCard key={item.id} name={item.name} description={item?.known_for_department} profileUrl={item.profile_path} />
                    )}
                />
            }
        </section>
    )
}

export default TrendingActorSection