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
import { ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { getImageUrl } from '@/lib/image';
import TextWithTooltip from '@/components/common/TextWithTooltip';
import { useIsMobile } from '@/hooks';

const WatchingPage = () => {
    const isMb = useIsMobile()
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
        <section className="relative container min-h-screen pt-20 ">
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-md">
                </div>
                <Image alt={data?.item?.name} src={getImageUrl(isMb ? data?.item?.thumb_url : data?.item?.poster_url)} width={1200} height={1000} className='w-full h-full' />
            </div>
            {/* Breadcrumb Navigation */}
            <div className="relative z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Trang chủ
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`${ROUTES.MOVIE}?category=${data?.breadCrumb?.[0]?.slug.split('/')[2]}`} className="text-gray-400 hover:text-white transition-colors">
                                    {`Phim ${data?.breadCrumb?.[0]?.name.replace('Phim', '')}`}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white font-medium">
                                <TextWithTooltip maxLength={50}>
                                    {data?.item?.name}
                                </TextWithTooltip>
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