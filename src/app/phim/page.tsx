'use client';
import { useMovieListQuery } from '@/api/movie'
import FilterMenu from '@/components/common/FilterMenu';
import MovieCard from '@/components/common/MovieCard'
import { PaginationControl } from '@/components/common/PaginationControl';
import MovieListSkeleton from '@/components/skeletons/MovieListSkeleton';
import { calculateTotalPages } from '@/lib/utils';
import { SortFieldType } from '@/types/common';
import { useSearchParams, useRouter } from 'next/navigation'; // <-- Import useRouter

const PhimPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const category = searchParams.get('category') ?? ''
    const genre = searchParams.get('genre') ?? ''
    const country = searchParams.get('country') ?? ''
    const currentPage = searchParams.get('page') || 1
    const sortField = searchParams.get('sort_filed') || 'modified.time'

    // 3. Gọi API với các params hiện tại
    const { data, isFetching } = useMovieListQuery({
        params: {
            slug: category,
            category: genre,
            country,
            page: +currentPage,
            sort_field: sortField as SortFieldType,
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


    const totalPages = data?.params?.pagination?.totalPages ? data?.params?.pagination?.totalPages : calculateTotalPages(data?.params?.pagination?.totalItems!, data?.params?.pagination?.totalItemsPerPage!)

    if (isFetching) return <MovieListSkeleton />
    return (
        <section className='relative container py-20'>
            <div className="flex items-center justify-between">
                <h1 className='xl:text-2xl text-base font-semibold text-primary'>{data?.titlePage ?? 'Phim'}</h1>
                <FilterMenu />
            </div>
            <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 grid-cols-2 mt-6 gap-6">
                {data?.items?.map((item) => (
                    <MovieCard key={item._id} movie={item} /> // <-- Luôn thêm 'key'
                ))}
            </div>
            {totalPages > 1 && (
                <div className='flex items-center justify-center mt-10'>
                    <PaginationControl
                        isControlByInput
                        totalPages={totalPages}
                        currentPage={+currentPage}
                        onPageChange={handlePageChange}
                        siblingCount={1}
                    />
                </div>
            )}
        </section>
    )
}

export default PhimPage