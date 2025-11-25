import { useMovieSimilar } from "@/api/movie";
import { generateImageUrl } from "@/lib/tmdb";
import Image from "next/image";

const SimilarSection = ({ id }: { id: number }) => {
    const { data: similar } = useMovieSimilar({ id }, { enabled: !!id })
    console.log('similar :', similar)
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary">More Like This</h2>
            <div className="space-y-4">
                {similar?.items?.map((movie, idx) => (
                    <div key={idx} className="flex gap-4 hover:bg-secondary-800 p-3 rounded-lg transition-colors cursor-pointer">
                        <div className="w-20 h-28 rounded-lg overflow-hidden bg-secondary-700 shrink-0">
                            {movie.poster_path ? (
                                <Image
                                    src={generateImageUrl(movie.poster_path, 'original')}
                                    alt={movie.title}
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
                        <div className="flex flex-col justify-center">
                            <h3 className="font-semibold mb-1">{movie.title}</h3>
                            <p className="text-sm text-gray-400">
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarSection