'use client';
import { useMyCommentsQuery } from '@/api/movie'
import CommentCard from '@/components/common/CommentCard';
import MovieListSkeleton from '@/components/skeletons/MovieListSkeleton';
import { useAuth } from '@/hooks';
import ReviewTable from './components/ReviewTable';

const MyReviews = () => {
    const { data, isFetching, refetch } = useMyCommentsQuery()
    const { isLogged } = useAuth()

    if (!isLogged) {
        return (
            <section className='relative container py-20 min-h-screen flex w-full items-center justify-center'>
                <p className="text-zinc-400 text-lg">
                    Vui lòng đăng nhập để lấy danh sách đánh giá của bạn
                </p>
            </section>
        )
    }

    return (
        <section className='relative container py-20 min-h-screen'>
            {/* Filter Menu */}
            <div className="flex items-center justify-between mb-4">
                <h1 className='text-xl font-medium text-primary'>{'Đánh giá của bạn'}</h1>
            </div>

            <ReviewTable />

            {/* Hiển thị khi không có kết quả */}
            {data?.length === 0 && (
                <div className="text-center py-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <p className="text-zinc-400 text-lg">
                        Không tìm thấy đánh giá nào của bạn!.
                    </p>
                </div>
            )}
        </section>
    )
}

export default MyReviews