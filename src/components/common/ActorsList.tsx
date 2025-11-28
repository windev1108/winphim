'use client';
import { IPeopleOverview, useMoviePeoplesQuery } from '@/api/movie';
import ProfileCard from '@/components/common/ProfileCard';

interface IActorsListProps {
    peopleOverview: IPeopleOverview
}

const ActorsList = ({ peopleOverview }: IActorsListProps) => {
    if (peopleOverview?.peoples.length === 0) return null
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-primary">Diễn viên</h2>
            <div className="flex gap-8 flex-wrap pb-4 md:justify-start justify-center">
                {peopleOverview?.peoples?.splice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[120px]">
                        <ProfileCard name={item?.name} description={item?.character} profileUrl={item?.profile_path} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActorsList