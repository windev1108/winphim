'use client';
import HeroSection from "./components/HeroSection";
import CategoryMovieSection from "./components/CategoryMovieSection.tsx";

export default function Home() {
  return (
    <section className='relative flex flex-col xl:gap-20 gap-10'>
      <HeroSection />
      <CategoryMovieSection category="phim-moi" title="Phim mới nhất" />
      <CategoryMovieSection category="phim-chieu-rap" title="Phim chiếu rạp" />
      <CategoryMovieSection category="phim-le" title="Phim lẻ mới" />
      <CategoryMovieSection category="phim-bo" title="Phim bộ mới" />
      <CategoryMovieSection category="hanh-dong" title="Phim hành động mới" />
      <CategoryMovieSection category="co-trang" title="Phim cổ trang mới" />
      <CategoryMovieSection category="phim-sap-chieu" title="Phim sắp chiếu" />
      <CategoryMovieSection category="tv-shows" title="Chương trình TV" />
    </section>
  )
}
