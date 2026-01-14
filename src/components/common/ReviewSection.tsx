import { addCommentMovieRequest, deleteCommentMovieRequest, useCommentByMoviesQuery } from '@/api/movie'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { getMutateError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { Textarea } from '../ui/textarea'
import Rating from '../ui/rating'
import Image from 'next/image'
import CommentCard from './CommentCard'
import { useAuth } from '@/hooks'

interface IReviewSectionProps {
    movieId: string
}

const ReviewSection = ({ movieId }: IReviewSectionProps) => {
    const { isLogged } = useAuth()
    const { data: comments, refetch } = useCommentByMoviesQuery({
        params: {
            movieId
        },
        options: {
            enabled: !!movieId
        }
    })
    const { mutateAsync, isPending } = useMutation({
        mutationFn: addCommentMovieRequest
    })


    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await mutateAsync({
                movieId,
                content: reviewText,
                rating
            })
            toast.success("Thêm bình luận thành công!")
            refetch()
        } catch (error) {
            getMutateError(error)
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold mb-6 text-primary'>Bình luận</h2>
            {comments?.length! > 0 ?
                <div className="w-full flex  flex-col items-center gap-2">
                    {comments?.map((item) => (
                        <CommentCard key={item.id} comment={item} refetch={refetch} />
                    ))}
                </div>
                :
                <h1 className='text-center py-20  text-sm text-secondary-300'>Chưa có bình luận nào, bạn hãy là người để lại bình luận đầu tiên</h1>

            }

            {isLogged ?
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 bg-secondary-800 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                        <Rating onChange={setRating} />
                        <span className='text-sm text-secondary-200'>{`${rating}/10`}</span>
                    </div>
                    <Textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Viết bình luận của bạn..."
                        className="w-full"
                    />
                    <Button
                        disabled={rating <= 0}
                        type="submit"
                        loading={isPending}
                        className='max-w-40 self-end'
                    >
                        Bình luận
                    </Button>
                </form>
                :
                <>
                    {comments?.length! > 0 &&
                        <h1 className='text-center py-20 text-sm text-secondary-300'>Hãy đăng nhập để bình luận</h1>
                    }
                </>
            }
        </div>
    )
}

export default ReviewSection