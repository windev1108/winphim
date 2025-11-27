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
import { useMovieDetailQuery, useMoviePeoplesQuery } from '@/api/movie';
import ViewMovieSection from './components/ViewMovieSection';
import { useEffect } from 'react';

const WatchingPage = () => {
    const { slug }: { slug: string } = useParams();
    const { data } = useMovieDetailQuery({
        params: {
            slug
        }
    });
    const { data: peopleOverview } = useMoviePeoplesQuery({
        params: {
            slug
        }
    });


    useEffect(() => {
        if (data?.seoOnPage?.titleHead) {
            document.title = data?.seoOnPage?.titleHead;
        }
    }, [data?.item]);


    if (!data?.item) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading...</div>
            </section>
        );
    }


    return (
        <section className="container min-h-screen xl:pt-20 pt-10">
            {/* Breadcrumb Navigation */}
            <div className="px-6">
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

            <ViewMovieSection variant={data?.item?.type} movie={data?.item} peopleOverview={peopleOverview!} />

        </section>
    );
};

export default WatchingPage;