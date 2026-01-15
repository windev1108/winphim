import { IMovie, IPeopleOverview, MovieType } from '@/api/movie';
import NotFound from '@/app/not-found';
import SimilarSection from '@/app/phim/[slug]/components/SimilarSection';
import ActorsList from '@/components/common/ActorsList';
import MovieInfo from '@/components/common/MovieInfo';
import ReviewSection from '@/components/common/ReviewSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { redirect, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

interface ViewMovieSectionProps {
    movie: IMovie
    peopleOverview: IPeopleOverview
    variant: MovieType
}

const ViewMovieSection = ({ variant = 'series', movie, peopleOverview }: ViewMovieSectionProps) => {
    const searchParams = useSearchParams()
    const epQuery = searchParams.get('ep') ?? '1'
    const [serverSelected, setServerSelected] = useState(0)
    const movieColRef = useRef<HTMLDivElement | null>(null)

    const currentServer = movie?.episodes[serverSelected]
    const currentEpisode = currentServer.server_data?.find((x) => x.name === epQuery) ?? currentServer.server_data[0]

    return (
        <div className='flex flex-col z-10'>
            {/* Video Player Section */}
            <div className="grid grid-cols-10 gap-4 mt-4">
                <div ref={movieColRef} className="xl:col-span-8 col-span-10 relative w-full">
                    {/* Video Player Placeholder */}
                    <div className='xl:h-[680px] md:h-[400px] h-[250px] bg-secondary-800'>
                        {currentEpisode?.link_embed && currentEpisode?.link_m3u8 ? (
                            <iframe
                                allowFullScreen
                                src={currentEpisode?.link_embed || currentEpisode?.link_m3u8}
                                className="w-full h-full aspect-video"
                            />
                        ) : (
                            <NotFound isFullHeight={false} />
                        )}
                    </div>

                    <div className="flex flex-col gap-6 p-4 rounded-xl mt-4 backdrop-blur-3xl bg-background/50">
                        {/* SERVER button */}
                        <div className="flex items-center flex-wrap max-w-xl gap-2">
                            {movie?.episodes?.map((item, index) => (
                                <Button onClick={() => setServerSelected(index)} variant={serverSelected === index ? 'default' : 'outline'} size={'sm'} key={item.server_name}>{item.server_name}</Button>
                            ))}
                        </div>

                        {variant !== 'single' &&
                            <div className="flex items-center gap-2 flex-wrap xl:max-w-1/2">
                                {currentServer?.server_data?.map((item) => (
                                    <Button className='w-8' onClick={() => redirect(`${ROUTES.WATCHING_MOVIE}/${movie?.slug}?ep=${item.slug}`)} variant={item?.slug === epQuery ? 'default' : 'outline'} size={'sm'} key={item.slug}>{item.name}</Button>
                                ))}
                            </div>
                        }


                        {/* Title and Meta */}
                        <MovieInfo movie={movie} />

                        <ActorsList peopleOverview={peopleOverview} />

                        <ReviewSection movieId={movie._id} />
                    </div>


                </div>
                <div
                    onWheel={(e) => e.stopPropagation()}
                    className={`xl:col-span-2 col-span-10 z-10 backdrop-blur-3xl overflow-y-auto rounded-xl bg-background/50`}
                >
                    <SimilarSection variant='watching' category={movie?.category?.map((x) => x.slug).join(',')} currentMovie={movie} />
                </div>
            </div >
        </div >
    )
}

export default ViewMovieSection