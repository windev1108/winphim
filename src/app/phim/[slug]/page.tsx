'use client';
import { Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useMovieDetailQuery, useMoviePeoplesQuery } from "@/api/movie";
import { getImageUrl } from "@/lib/image";
import ActorsList from "../../../components/common/ActorsList";
import SimilarSection from "./components/SimilarSection";
import MovieInfo from "@/components/common/MovieInfo";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks";
import VideoWrapper from "@/components/motion/video-wrapper";
import ReviewSection from "@/components/common/ReviewSection";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetail = () => {
    const isMb = useIsMobile()
    const { slug }: { slug: string } = useParams();
    const { data: movie, isFetching } = useMovieDetailQuery({
        params: {
            slug
        },
        options: {
            enabled: !!slug
        }
    });
    const { data: peopleOverview } = useMoviePeoplesQuery({
        params: {
            slug
        },
        options: {
            enabled: !!slug
        }
    },
    )

    useEffect(() => {
        if (movie?.seoOnPage?.titleHead) {
            document.title = movie?.seoOnPage?.titleHead;
        }
    }, [movie?.seoOnPage?.titleHead]);

    if (!movie?.item || isFetching) {
        return (
            <section className="flex flex-col min-h-screen">
                <Skeleton className="relative xl:p-8 p-4 flex flex-col bg-secondary-800 xl:h-[600px] h-[500px] w-full overflow-hidden">
                </Skeleton>
                <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 xl:mt-12 mt-4">
                    {/* Left Column - Cast & Reviews */}
                    <div className="lg:col-span-2 col-span-3 gap-6 flex flex-col">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-40 h-8 rounded-md" />
                            <Skeleton className="w-2/3 h-36 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-40 h-8 rounded-md" />
                            <Skeleton className="w-full h-36 rounded-md" />
                        </div>
                    </div>

                    {/* Right Column - Similar Movies */}
                    <div className="lg:col-span-1 col-span-3" >
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-40 h-8 rounded-md" />
                            <Skeleton className="w-2/3 h-90 rounded-md" />
                        </div>
                    </div>
                </div>
            </section >
        );
    }

    return (
        <section className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative xl:p-8 p-4 flex flex-col bg-secondary-800 xl:h-[600px] h-[500px] w-full overflow-hidden">
                {/* Background Image */}
                {movie?.item?.poster_url && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            width={1000}
                            height={1000}
                            priority
                            quality={90}
                            src={getImageUrl(isMb ? movie?.item?.thumb_url : movie?.item?.poster_url)}
                            alt={movie?.item?.name}
                            className="object-cover w-full h-full"

                        />
                        {/* 4 Corner Vignette Gradient Overlays */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/70 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-l from-black/50 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="container relative z-10 flex flex-col justify-center h-full xl:pt-28 pt-8 xl:px-8! px-0!">
                    <div className="flex flex-col gap-4">
                        <MovieInfo movie={movie?.item} />

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4">
                            <Link href={`${ROUTES.WATCHING_MOVIE}/${slug}`}>
                                <Button className="flex items-center rounded-lg text-black">
                                    <Play size={20} />
                                    <span>Xem phim</span>
                                </Button>
                            </Link>
                            <VideoWrapper videoUrl={movie?.item?.trailer_url} disabled={!movie?.item?.trailer_url}>
                                <Button disabled={!movie?.item?.trailer_url} className="rounded-lg" variant={'outline'}>
                                    <Play size={20} />
                                    Xem Trailer
                                </Button>
                            </VideoWrapper>
                            {/* <Button className="rounded-lg" variant={'outline'}>
                            <Plus size={20} />
                            Add to Watchlist
                        </Button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 xl:mt-12 mt-4">
                {/* Left Column - Cast & Reviews */}
                <div className="lg:col-span-2 col-span-3 gap-6 flex flex-col">
                    <ActorsList peopleOverview={peopleOverview!} />
                    <ReviewSection movie={movie.item} />
                </div>

                {/* Right Column - Similar Movies */}
                <div className="lg:col-span-1 col-span-3">
                    <SimilarSection currentMovie={movie?.item} category={movie?.item?.category?.map((x) => x.slug).join(',')} />
                </div>
            </div>
        </section>
    );
};

export default MovieDetail;