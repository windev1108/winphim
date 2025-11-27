'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { useMovieHomepageQuery } from '@/api/movie';
import { getImageUrl } from '@/lib/image';
import MovieInfo from '@/components/common/MovieInfo';

const HeroSection = () => {
    const { data } = useMovieHomepageQuery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const movies = data?.items?.slice(0, 20) || [];
    const currentMovie = movies[currentIndex];

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [movies.length]);

    if (!currentMovie) {
        return (
            <div className="relative w-full aspect-390/339 xl:aspect-1600/600 bg-gray-900 animate-pulse" />
        );
    }

    return (
        <div className="relative w-full aspect-390/339 xl:aspect-1600/600 bg-gray-900 overflow-hidden">
            {/* Background Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={getImageUrl(currentMovie.thumb_url, data?.APP_DOMAIN_CDN_IMAGE)}
                        alt={currentMovie.name}
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        className="object-cover"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl gap-4"
                >

                    <MovieInfo movie={currentMovie} />


                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Link href={`${ROUTES.XEM_PHIM}/${currentMovie?.slug}`}>
                            <Button size={'lg'}>
                                <Play size={18} fill="currentColor" />
                                <span>{'Xem phim'}</span>
                            </Button>
                        </Link>
                        <Link href={`${ROUTES.PHIM}/${currentMovie?.slug}`}>
                            <Button variant={'outline'} size={'lg'}>
                                <Info size={18} />
                                <span>{'More info'}</span>
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {movies.map((_, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            width: index === currentIndex ? 32 : 6,
                            backgroundColor: index === currentIndex ? '#eab308' : '#6b7280',
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;