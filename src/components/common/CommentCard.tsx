import { deleteCommentMovieRequest, IComment } from '@/api/movie'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks'
import { Button } from '../ui/button'
import { EditIcon, Loader, TrashIcon } from 'lucide-react'
import { LoaderIcon } from 'react-hot-toast'
import { getMutateError } from '@/lib/utils'

interface CommentCardProps {
    comment: IComment
    refetch: () => void
}

const CommentCard = ({ comment, refetch }: CommentCardProps) => {
    const { user } = useAuth()
    const { mutateAsync: deleteComment, isPending } = useMutation({
        mutationFn: deleteCommentMovieRequest,
        onSuccess: () => {
            refetch()
        },
        onError: getMutateError
    })

    const isYour = user.id === comment.user?.id

    return (
        <div className="flex gap-4 bg-secondary-800 w-full rounded-xl p-4">
            <Avatar className='w-10 h-10 bg-secondary-800'>
                <AvatarImage src={comment?.user?.avatar} />
                <AvatarFallback className='text-xl'>
                    <Image width={40} height={40} src={'/images/avatar-default.png'} alt='avt' />
                </AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col gap-1">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <h1 className='text-sm font-semibold'>{`${comment?.user?.firstName ?? ''} ${comment?.user?.lastName ?? ''}`} </h1>
                        {isYour &&
                            <div className='flex items-center gap-4'>
                                <span className='text-sm'>(Bạn)</span>
                                {/* <Button variant={'outline'} size={'icon-sm'}>
                                    <EditIcon />
                                </Button> */}
                                <Button onClick={() => deleteComment({ id: comment.id })} variant={'outline'} size={'icon-sm'}>
                                    {isPending ?
                                        <LoaderIcon />
                                        :
                                        <TrashIcon />

                                    }
                                </Button>
                            </div>
                        }

                    </div>
                    <div className="flex items-center gap-1">
                        <svg
                            className='size-4 transition-colors text-primary'
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <span className='text-sm text-primary pt-1'>{`${comment?.rating}/10`}</span>
                    </div>
                </div>
                <span className='text-sm text-secondary-300' dangerouslySetInnerHTML={{ __html: comment?.content ?? '' }}></span>
            </div>
        </div>
    )
}

export default CommentCard