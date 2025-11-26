'use client';
import { useCountryListQuery } from "@/api/country"
import { useGenreListQuery } from "@/api/genre"
import { useYearListQuery } from "@/api/years"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover";
import { ArrowRight, Filter, RefreshCcw } from "lucide-react"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/lib/routes";

interface IFormFilter {
    category: string
    country: string
    genre: string
    sort_filed: string
    year: string | number
}

const DEFAULT_FILTER_PARAMS: IFormFilter = {
    category: 'all',
    country: 'all',
    genre: 'all',
    sort_filed: '_id',
    year: 'all'
}

export default function FilterMenu() {
    const { data: country } = useCountryListQuery()
    const { data: genre } = useGenreListQuery()
    const { data: year } = useYearListQuery()
    const [filter, setFilter] = useState<IFormFilter>(DEFAULT_FILTER_PARAMS)
    const router = useRouter()

    const handleFilter = () => {
        const params = new URLSearchParams();
        Object.keys(filter).forEach(key => {
            const value = filter[key as keyof IFormFilter];
            if (value !== 'all') {
                params.set(key, String(value));
            }
        });

        const queryString = params.toString();
        router.replace(`?${queryString}`);
    }

    const handleClearFilter = () => {
        setFilter(DEFAULT_FILTER_PARAMS)
    }

    const handleFiltering = () => {
        const filterKeys = Object.keys(DEFAULT_FILTER_PARAMS) as (keyof IFormFilter)[];
        return filterKeys.some((key) => {
            const currentValue = filter[key];
            const defaultValue = DEFAULT_FILTER_PARAMS[key];
            if (currentValue !== defaultValue) {
                return true;
            }
            return false;
        });
    }

    const isFiltering = handleFiltering()

    const genres = [{ id: 'all', slug: 'all', name: 'Tất cả' }, ...genre?.items ?? []]
    const countries = [{ id: 'all', slug: 'all', name: 'Tất cả' }, ...country?.items ?? []]
    const years = [{ label: 'Tất cả', value: 'all' }, ...year?.items?.slice(0, 18).map((x) => ({ value: x.year, label: x.year })) ?? []]
    const sorts = [{ label: 'Mới nhất', value: '_id' }, { label: 'Mới cập nhật', value: 'modified.time' }, { label: 'Điểm IMDb', value: 'imdb_rating' }]

    return (
        <Popover>
            <PopoverTrigger >
                <Button size={'sm'} variant={'outline'} className="flex items-center gap-2 text-primary">
                    <span className="font-medium">Bộ lọc</span>
                    <Filter className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="xl:w-6xl w-screen bg-secondary-800 xl:h-auto h-96 overflow-y-auto" sideOffset={10} align="end">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-15 items-start gap-2 border-b border-secondary-700 pb-2">
                        <span className="xl:col-span-1 col-span-14 whitespace-nowrap text-sm">Thể loại :</span>
                        <div className="xl:col-span-14 col-span-15 flex items-center gap-2 flex-wrap">
                            {genres.map((item) => (
                                <Button key={item.slug} onClick={() => setFilter((prev) => ({ ...prev, category: item.slug }))} size={'xs'} variant={filter?.category === item.slug ? 'outline' : 'ghost'}>{item?.name}</Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-15 items-start gap-2 border-b border-secondary-700 pb-2">
                        <span className="xl:col-span-1 col-span-14 whitespace-nowrap text-sm">Quốc gia :</span>
                        <div className="xl:col-span-14 col-span-15 flex items-center gap-2 flex-wrap">
                            {countries?.map((item) => (
                                <Button key={item.slug} onClick={() => setFilter((prev) => ({ ...prev, country: item.slug }))} size={'xs'} variant={filter?.country === item.slug ? 'outline' : 'ghost'}>{item?.name}</Button>
                            ))}
                        </div>
                    </div>


                    <div className="grid grid-cols-15 items-start gap-2 border-b border-secondary-700 pb-2">
                        <span className="xl:col-span-1 col-span-14 whitespace-nowrap text-sm">Năm :</span>
                        <div className="xl:col-span-14 col-span-15 flex items-center gap-2 flex-wrap">
                            {years?.map((item) => (
                                <Button key={item.value} onClick={() => setFilter((prev) => ({ ...prev, year: item.value }))} size={'xs'} variant={filter?.year === item.value ? 'outline' : 'ghost'}>{item?.label}</Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-15 items-start gap-2 border-b border-secondary-700 pb-2">
                        <span className="xl:col-span-1 col-span-14 whitespace-nowrap text-sm">Sắp xếp :</span>
                        <div className="xl:col-span-14 col-span-15 flex items-center gap-2 flex-wrap">
                            {sorts?.map((item) => (
                                <Button key={item.value} onClick={() => setFilter((prev) => ({ ...prev, sort_filed: item.value }))} size={'xs'} variant={filter?.sort_filed === item.value ? 'outline' : 'ghost'}>{item.label}</Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button onClick={handleFilter}>Lọc kết quả <ArrowRight /></Button>
                        <Button disabled={!isFiltering} onClick={handleClearFilter} variant={'outline'}>Đặt lại <RefreshCcw /> </Button>
                    </div>

                </div>
            </PopoverContent>
        </Popover >
    )
}
