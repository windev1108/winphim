'use client';
import { useMovieReviews } from "@/api/movie";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewsSection = ({ id }: { id: number }) => {
    const { data: reviews } = useMovieReviews({ id }, { enabled: !!id })
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Reviews</h2>
            <div className="space-y-6">
                {reviews?.items?.map((review, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary-700 shrink-0 overflow-hidden">
                            {review.author_details?.avatar_path && (
                                <Image
                                    src={review.author_details.avatar_path.startsWith('/http')
                                        ? review.author_details.avatar_path.slice(1)
                                        : `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`}
                                    alt={review.author}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold">{review.author}</p>
                                {review.author_details?.rating && (
                                    <div className="flex items-center gap-1 text-primary">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-sm">{review.author_details.rating}/10</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-3">{review.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSection