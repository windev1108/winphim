import MovieCardSkeleton from './MovieCardSkeleton'

const MovieListSkeleton = () => {
    return (
        <section className='relative'>
            <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 grid-cols-2 mt-6 gap-6">
                {Array.from({ length: 16 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        </section>
    )
}

export default MovieListSkeleton