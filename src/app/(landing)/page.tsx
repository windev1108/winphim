'use client';
import HeroSection from "./components/HeroSection";
import CategoryMovieSection from "./components/CategoryMovieSection.tsx";
import { useGenreListQuery } from "@/api/genre";

export default function Home() {
  const { data } = useGenreListQuery()
  return (
    <section className='relative flex flex-col xl:gap-20 gap-10'>
      <HeroSection />
      <CategoryMovieSection category="phim-moi" title="Phim mới nhất" />
      <CategoryMovieSection category="phim-le" title="Phim lẻ mới nhất" />
      <CategoryMovieSection category="phim-bo" title="Phim bộ mới nhất" />
      <CategoryMovieSection category="phim-sap-chieu" title="Phim sắp chiếu" />
      <CategoryMovieSection category="tv-shows" title="Chương trình TV" />
    </section>
  )
}
