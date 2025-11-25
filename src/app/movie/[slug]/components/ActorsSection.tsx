'use client';
import { useMoviePeoplesQuery } from '@/api/movie';
import ProfileCard from '@/components/common/ProfileCard';
import { useParams } from 'next/navigation';

const ActorsSection = () => {
    const { slug }: { slug: string } = useParams();
    const { data: people } = useMoviePeoplesQuery({
        params: {
            slug
        },
        options: {
            enabled: !!slug
        }
    });
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Diễn viên</h2>
            <div className="flex gap-8 flex-wrap pb-4">
                {people?.peoples?.splice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[120px]">
                        <ProfileCard name={item?.name} description={item?.character} profileUrl={item?.profile_path} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActorsSection