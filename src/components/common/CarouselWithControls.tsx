import React, { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '../ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselWithControlsProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
    titleClassName?: string;
    loop?: boolean;
    itemsToShow?: number;
    gap?: number;
    itemWidth?: number | string;
    itemHeight?: number | string;
}

function CarouselWithControls<T>({
    title,
    items,
    renderItem,
    className = '',
    titleClassName = '',
    loop = false,
    itemsToShow = 4,
    gap = 16,
}: CarouselWithControlsProps<T>) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    useEffect(() => {
        if (!api) return;

        const updateScrollState = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        updateScrollState();
        api.on('select', updateScrollState);
        api.on('reInit', updateScrollState);

        return () => {
            api.off('select', updateScrollState);
            api.off('reInit', updateScrollState);
        };
    }, [api]);

    const getBasisWidth = () => {
        const percentage = 100 / itemsToShow;
        const gapTotal = (gap * (itemsToShow - 1)) / itemsToShow;
        return `calc(${percentage}% - ${gapTotal}px)`;
    };

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-4">
                <h2 className={`font-bold text-primary ${titleClassName}`}>
                    {title}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => api?.scrollPrev()}
                        disabled={!canScrollPrev}
                        className="xl:w-10 w-8 xl:h-10 h-8 rounded-xl bg-secondary-600 hover:bg-secondary-700 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-secondary-600"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => api?.scrollNext()}
                        disabled={!canScrollNext}
                        className="xl:w-10 w-8 xl:h-10 h-8 rounded-xl bg-secondary-600 hover:bg-secondary-700 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-secondary-600"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
            <Carousel
                setApi={setApi}
                opts={{
                    align: 'start',
                    loop: loop,
                }}
                className="w-full"
            >
                <CarouselContent style={{ marginLeft: `-${gap}px`, gap: `${gap}px` }}>
                    {items.map((item, index) => (
                        <CarouselItem
                            key={index}
                            style={{
                                paddingLeft: `${gap}px`,
                                flexBasis: getBasisWidth(),
                            }}
                        >
                            {renderItem(item)}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselWithControls;
