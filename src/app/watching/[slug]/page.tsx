'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useMovieDetailQuery } from '@/api/movie';
import SingleMovieSection from './components/SingleMovieSection';
import SeriesMovieSection from './components/SeriesMovieSection';

const WatchingPage = () => {
    const { slug }: { slug: string } = useParams();
    const { data } = useMovieDetailQuery({
        params: {
            slug
        }
    });


    if (!data?.item) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading...</div>
            </section>
        );
    }


    return (
        <section className="container min-h-screen py-20">
            {/* Breadcrumb Navigation */}
            <div className="px-6 py-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/movies" className="text-gray-400 hover:text-white transition-colors">
                                    Movies
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white font-medium">
                                {data?.item?.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {data?.item?.type === 'single' &&
                <SingleMovieSection movie={data?.item} />
            }

            {data?.item?.type !== 'single' &&
                <SeriesMovieSection movie={data?.item} />
            }
        </section>
    );
};

export default WatchingPage;