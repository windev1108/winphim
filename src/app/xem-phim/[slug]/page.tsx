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
import { Skeleton } from '@/components/ui/skeleton';

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
            <section className="relative container min-h-screen pt-20 ">
                <div className='flex flex-col'>
                    <Skeleton className='w-96 h-7' />
                    <div className="grid grid-cols-10 gap-4 mt-4">
                        <div className="xl:col-span-8 col-span-10 relative w-full gap-4 flex flex-col" >
                            <Skeleton className='xl:h-[680px] md:h-[400px] h-[250px] w-full' />
                            <Skeleton className='h-64 w-full' />
                        </div>
                        <div className={`xl:col-span-2 col-span-10 z-10 backdrop-blur-3xl overflow-y-auto rounded-xl bg-background/50`}>
                            <Skeleton className='h-screen w-full' />
                        </div>
                    </div >
                </div>

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