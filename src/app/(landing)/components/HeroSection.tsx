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
    const [selectedEpisode, setSelectedEpisode] = useState(1);
    const movies = data?.items?.slice(0, 20) || [];
    const currentMovie = movies[currentIndex];

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [movies.length]);

    const handleDragEnd = (_e: any, info: any) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            // Drag right - previous
            setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
        } else if (info.offset.x < -threshold) {
            // Drag left - next
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }
    };

    if (!currentMovie) {
        return (
            <div className="relative w-full h-screen bg-secondary-800 animate-pulse" />
        );
    }

    return (
        <motion.div
            className="relative w-full h-screen bg-secondary-800 overflow-hidden select-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
        >
            {/* Background Image with subtle fade animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${currentIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute inset-0 pointer-events-none"
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
                    {/* 4 Corner Vignette Gradient Overlays */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-l from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent" />
                    {/* Corner vignette effect */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40"
                        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
                </motion.div>
            </AnimatePresence>

            {/* Content - subtle fade from left */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-16 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${currentIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="max-w-3xl flex flex-col gap-6 pointer-events-auto"
                    >
                        <MovieInfo movie={currentMovie} />
                        <div className="flex gap-3">
                            <Link href={`${ROUTES.WATCHING_MOVIE}/${currentMovie?.slug}`}>
                                <Button size={'lg'}>
                                    <Play size={18} fill="currentColor" />
                                    <span>Xem phim</span>
                                </Button>
                            </Link>
                            <Link href={`${ROUTES.MOVIE}/${currentMovie?.slug}`}>
                                <Button variant={'outline'} size={'lg'}>
                                    <Info size={18} />
                                    <span>Thông tin</span>
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <motion.div
                            animate={{
                                width: index === currentIndex ? 32 : 8,
                                backgroundColor: index === currentIndex ? '#eab308' : '#6b7280',
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-2 rounded-full cursor-pointer hover:bg-yellow-400"
                        />
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default HeroSection;