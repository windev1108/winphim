'use client';
import { Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useMovieDetailQuery, useMovieImagesQuery, useMoviePeoplesQuery } from "@/api/movie";
import { getTMDBImageUrl } from "@/lib/image";
import ActorsList from "../../../components/common/ActorsList";
import TextWithTooltip from "@/components/common/TextWithTooltip";
import SimilarSection from "./components/SimilarSection";
import MovieInfo from "@/components/common/MovieInfo";

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

    const { data: peopleOverview } = useMoviePeoplesQuery({
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

    return (
        <section className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative p-8 pt-16 flex flex-col bg-secondary-800 min-h-[500px] w-full  overflow-hidden">
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
                        <div className="absolute inset-0 bg-linear-to-r from-secondary-700 via-transparent to-secondary-700" />
                    </div>
                )}

                {/* Content */}
                <div className="container relative z-10 flex flex-col justify-end h-full pt-28 gap-3">
                    <MovieInfo movie={movie?.item} />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <Link href={`${ROUTES.XEM_PHIM}/${slug}`}>
                            <Button className="flex items-center rounded-lg">
                                <Play size={20} fill="currentColor" />
                                Xem phim
                            </Button>
                        </Link>
                        <Button className="rounded-lg" variant={'outline'}>
                            <Play size={20} />
                            Play Trailer
                        </Button>
                        {/* <Button className="rounded-lg" variant={'outline'}>
                            <Plus size={20} />
                            Add to Watchlist
                        </Button> */}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 xl:mt-12 mt-4">
                {/* Left Column - Cast & Reviews */}
                <div className="lg:col-span-2">
                    <ActorsList peopleOverview={peopleOverview!} />
                </div>

                {/* Right Column - Similar Movies */}
                <div className="lg:col-span-1">
                    <SimilarSection currentMovie={movie?.item} category={movie?.item?.category?.map((x) => x.slug).join(',')} />
                </div>
            </div>
        </section>
    );
};

export default MovieDetail;