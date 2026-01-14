'use client';
import { useMovieListQuery } from '@/api/movie'
import FilterMenu from '@/components/common/FilterMenu';
import MovieCard from '@/components/common/MovieCard'
import { PaginationControl } from '@/components/common/PaginationControl';
import MovieListSkeleton from '@/components/skeletons/MovieListSkeleton';
import { MAPPING_QUERY_FIELDS } from '@/lib/constants';
import { calculateTotalPages } from '@/lib/utils';
import { SortFieldType } from '@/types/common';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MoviePage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [totalPages, setTotalPages] = useState(0)

    // Lấy tất cả params từ URL
    const category = searchParams.get('category') ?? ''
    const genre = searchParams.get('genre') ?? ''
    const country = searchParams.get('country') ?? ''
    const year = searchParams.get('year') ?? ''
    const currentPage = searchParams.get('page') || 1
    const sortField = searchParams.get('sort_filed') || 'modified.time'

    // Gọi API với các params
    const { data, isFetching } = useMovieListQuery({
        params: {
            slug: category,
            category: genre,
            country,
            year: year !== 'all' ? year : '',
            page: +currentPage,
            sort_field: MAPPING_QUERY_FIELDS[sortField] as SortFieldType,
            limit: 32,
        }
    })

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        if (newPage === 1) {
            params.delete('page')
        }
        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        const totalPageCalculated = data?.params?.pagination?.totalPages
            ? data?.params?.pagination?.totalPages
            : calculateTotalPages(
                data?.params?.pagination?.totalItems!,
                data?.params?.pagination?.totalItemsPerPage!
            )
        if (totalPageCalculated > 0) {
            setTotalPages(totalPageCalculated)
        }
    }, [data?.params?.pagination?.totalPages, data?.params?.pagination?.totalItemsPerPage])


    useEffect(() => {
        if (data?.seoOnPage?.titleHead) {
            document.title = data?.seoOnPage?.titleHead;
        }
    }, [data?.titlePage]);

    return (
        <section className='relative container py-20 min-h-screen'>
            {/* Filter Menu */}
            <div className="flex items-center justify-between mb-4">
                <h1 className='text-xl font-medium text-primary'>{data?.titlePage ?? ''}</h1>
                <FilterMenu />
            </div>
            {isFetching ?
                <MovieListSkeleton />
                :
                <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 grid-cols-2 xl:gap-6 gap-2">
                    {data?.items?.map((item) => (
                        <MovieCard key={item._id} movie={item} />
                    ))}
                </div>
            }
            {/* Phân trang */}
            {totalPages > 1 && (
                <div className='flex items-center justify-center mt-4'>
                    <PaginationControl
                        isControlByInput
                        totalPages={totalPages}
                        currentPage={+currentPage}
                        onPageChange={handlePageChange}
                        siblingCount={1}
                    />
                </div>
            )}

            {/* Hiển thị khi không có kết quả */}
            {data?.items?.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-zinc-400 text-lg">
                        Không tìm thấy phim nào phù hợp với bộ lọc của bạn
                    </p>
                </div>
            )}
        </section>
    )
}

export default MoviePage