'use client';
import { Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ActorsSection from "./components/ActorsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useMovieDetailQuery, useMovieImagesQuery } from "@/api/movie";
import { getTMDBImageUrl } from "@/lib/image";

const MovieDetail = () => {
    const { slug }: { slug: string } = useParams();
    const { data: movie } = useMovieDetailQuery({
        params: {
            slug
        },
        options: {
            enabled: !!slug
        }
    });
    const { data: image } = useMovieImagesQuery({
        params: {
            slug
        },
        options: {
            enabled: !!slug
        }
    },
    )

    if (!movie?.item) {
        return (
            <section className="container flex flex-col min-h-screen xl:pt-40 pt-20">
                <div className="animate-pulse">Loading...</div>
            </section>
        );
    }

    const rating = movie?.item?.imdb?.vote_average ? (movie?.item?.imdb?.vote_average / 2).toFixed(1) : 'N/A';
    const genres = movie?.item?.category?.map((g: any) => g.name) || '';
    const releaseYear = movie?.item?.modified ? new Date(movie?.item?.modified?.time).getFullYear() : '';

    return (
        <section className="container flex flex-col min-h-screen py-20">
            {/* Hero Section */}
            <div className="relative p-8 pt-16 flex flex-col bg-secondary-800 min-h-[500px] w-full rounded-xl overflow-hidden">
                {/* Background Image */}
                {movie?.item?.poster_url && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            fill
                            priority
                            quality={90}
                            sizes="100vw"
                            src={getTMDBImageUrl(image?.images[0]?.file_path!, 'w1280')}
                            alt={movie?.item?.name}
                            className="object-fill"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-secondary-900 via-secondary-900/80 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full pt-20">
                    <h1 className="text-5xl font-bold mb-4 max-w-3xl drop-shadow-lg">
                        {movie?.item?.name}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-300">
                        {genres?.map((x) => (
                            <Badge key={x} variant={'secondary'}>
                                {x}
                            </Badge>
                        ))}
                        {releaseYear &&
                            <Badge variant={'secondary'}>{releaseYear}</Badge>
                        }
                    </div>

                    {/* Description */}
                    <span className="text-gray-300 mb-6 max-w-3xl line-clamp-3" dangerouslySetInnerHTML={{ __html: movie?.item?.content }}>
                    </span>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <Link href={`${ROUTES.WATCHING}/${slug}`}>
                            <Button className="flex items-center rounded-lg">
                                <Play size={20} fill="currentColor" />
                                Watch
                            </Button>
                        </Link>
                        <Button className="rounded-lg" variant={'secondary'}>
                            <Play size={20} />
                            Play Trailer
                        </Button>
                        <Button className="rounded-lg" variant={'outline'}>
                            <Plus size={20} />
                            Add to Watchlist
                        </Button>
                        <div className="flex items-center gap-2 ml-auto">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    className={i < Math.round(movie?.item?.imdb?.vote_average / 2) ? 'text-primary' : 'text-gray-600'}
                                    fill={i < Math.round(movie?.item?.imdb?.vote_average / 2) ? 'currentColor' : 'none'}
                                />
                            ))}
                            <span className="text-lg font-semibold ml-2">{rating}/5</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Left Column - Cast & Reviews */}
                <div className="lg:col-span-2">
                    <ActorsSection />
                </div>

                {/* Right Column - Similar Movies */}
                <div className="lg:col-span-1">
                </div>
            </div>
        </section>
    );
};

export default MovieDetail;