'use client';
import { useSearchMovieListQuery } from '@/api/movie'
import FilterMenu from '@/components/common/FilterMenu'
import MovieCard from '@/components/common/MovieCard'
import { PaginationControl } from '@/components/common/PaginationControl'
import MovieListSkeleton from '@/components/skeletons/MovieListSkeleton'
import { calculateTotalPages } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchMoviePage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [totalPages, setTotalPages] = useState(0)
    const keyword = searchParams.get('keyword')
    const currentPage = searchParams.get('page') || 1

    const { data, isFetching } = useSearchMovieListQuery({
        params: {
            keyword: keyword!,
            page: +currentPage,
            limit: 32
        },
        options: {
            enabled: !!keyword,
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
    }, [data?.seoOnPage?.titleHead]);

    return (
        <section className='relative container py-20 min-h-screen'>
            {/* Filter Menu */}
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-xl font-medium text-primary'>Kết quả tìm kiếm "{keyword}"</h1>
                <FilterMenu />
            </div>
            {isFetching ?
                <MovieListSkeleton />
                :
                <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-6">
                    {data?.items?.map((item) => (
                        <MovieCard key={item._id} movie={item} />
                    ))}
                </div>
            }
            {/* Phân trang */}
            {totalPages > 1 && (
                <div className='flex items-center justify-center mt-6'>
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

export default SearchMoviePage