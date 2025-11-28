import { IMovie, useMovieListQuery } from "@/api/movie";
import TextWithTooltip from "@/components/common/TextWithTooltip";
import { getImageUrl } from "@/lib/image";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";

const SimilarSection = ({ variant = 'view', category, slug = 'phim-moi', currentMovie }: { variant?: 'view' | 'watching', category: string, slug?: string, currentMovie: IMovie }) => {
    const { data: similar } = useMovieListQuery({
        params: {
            slug,
            category,
            limit: 10
        }
    })

    const filterSimilar = similar?.items?.filter((x) => x._id !== currentMovie?._id) ?? []

    return (
        <div className="flex flex-col p-3">
            <h2 className="text-xl font-semibold mb-2 text-primary">Phim đề xuất</h2>
            <div className="space-y-0">
                {filterSimilar?.map((movie, idx) => (
                    <Link href={`${variant === 'view' ? ROUTES.PHIM : ROUTES.XEM_PHIM}/${movie?.slug}`} key={idx} className="flex gap-4 hover:bg-secondary-800/80 p-3 rounded-lg transition-colors cursor-pointer">
                        <div className="w-20 h-28 rounded-lg overflow-hidden bg-secondary-700 shrink-0">
                            {movie.thumb_url ? (
                                <Image
                                    src={getImageUrl(movie.thumb_url)}
                                    alt={movie.name}
                                    width={80}
                                    height={112}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    🎬
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-start">
                            <TextWithTooltip maxLength={24} className="font-semibold mb-1">
                                {movie.name}
                            </TextWithTooltip>
                            <TextWithTooltip maxLength={20} className="text-secondary-300 text-sm">
                                {movie.origin_name}
                            </TextWithTooltip>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarSection