'use client';
import HeroSection from "./components/HeroSection";
import CategoryMovieSection from "./components/CategoryMovieSection.tsx";
import { useGenreListQuery } from "@/api/genre";

export default function Home() {
  const { data } = useGenreListQuery()
  console.log('data :', data)
  return (
    <section className='relative flex flex-col xl:gap-20 gap-10'>
      <HeroSection />
      <CategoryMovieSection category="phim-le" title="Phim lẻ mới nhất" />
      <CategoryMovieSection category="phim-bo" title="Phim bộ mới nhất" />
    </section>
  )
}
