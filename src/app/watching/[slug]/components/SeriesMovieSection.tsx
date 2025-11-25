import { IMovie } from '@/api/movie';
import ActorsSection from '@/app/movie/[slug]/components/ActorsSection';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SeriesMovieSectionProps {
    movie: IMovie
}

const SeriesMovieSection = ({ movie }: SeriesMovieSectionProps) => {
    const genres = movie.category?.map((g) => g.name) || '';
    const [serverSelected, setServerSelected] = useState(0)
    const [episodeSelected, setEpisodeSelected] = useState(0)

    const currentServer = movie?.episodes[serverSelected]
    const currentEpisode = currentServer.server_data[episodeSelected]

    return (
        <div className='flex flex-col'>
            {/* Video Player Section */}
            <div className="relative w-full mt-4">
                <div className="relative aspect-video">
                    {/* Video Player Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {movie.episodes[0]?.server_data?.[0]?.link_embed ? (
                            <iframe
                                allowFullScreen
                                src={currentEpisode?.link_embed}
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="text-6xl opacity-30">▶</div>
                        )}

                    </div>
                </div>
            </div>

            {/* Movie Info Section */}
            <div className="flex flex-col gap-6 py-10">
                {/* SERVER button */}
                <div className="flex gap-4 items-center">
                    <h1 className='text-lg font-semibold'>Servers</h1>
                    <div className="flex items-center">
                        {movie?.episodes?.map((item, index) => (
                            <Button onClick={() => setServerSelected(index)} variant={serverSelected === index ? 'default' : 'outline'} size={'sm'} key={item.server_name}>{item.server_name}</Button>
                        ))}
                    </div>
                </div>

                {/* episodes button */}
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                        {currentServer?.server_data?.map((item, index) => (
                            <Button className='w-8' onClick={() => setEpisodeSelected(index)} variant={episodeSelected === index ? 'default' : 'outline'} size={'sm'} key={item.slug}>{item.name}</Button>
                        ))}
                    </div>
                </div>
                {/* Title and Meta */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{movie?.name}</h1>
                    <div className="flex items-center gap-4 text-gray-400">
                        <span> {movie?.type === 'series' ? 'Phim bộ' : 'Phim lẻ'}  </span>
                        <span>•</span>
                        {movie?.year && <span>{movie?.year}</span>}
                        <span>•</span>
                        <span>{`${movie?.quality}`}</span>
                        <span>•</span>
                        <span>{`${movie?.lang}`}</span>
                        <span>•</span>
                        <span>{`${movie?.episode_current.replace('Tập ', '')}/${movie?.episode_total}`}</span>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <span dangerouslySetInnerHTML={{ __html: movie?.content }} className="text-gray-300 leading-relaxed max-w-4xl">
                    </span>
                </div>

                {/* Genres */}
                {genres.length > 0 && (
                    <div className="flex gap-3">
                        {genres?.map((genre, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-sm hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}

                <ActorsSection />
            </div>
        </div>
    )
}

export default SeriesMovieSection