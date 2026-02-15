import { cn } from '@/lib/utils';
import { useState } from 'react';

interface RatingProps {
    quantity?: number
    defaultValue?: number
    className?: string
    value?: number
    onChange: (val: number) => void
}

const Rating = ({ quantity = 10, defaultValue = 0, className, value, onChange }: RatingProps) => {
    const [rating, setRating] = useState(defaultValue);
    const [hover, setHover] = useState(0);
    const currentValue = value !== undefined ? value : rating;

    const handleRating = (value: number) => {
        setRating(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className={cn("flex flex-row items-center gap-1", className)}>
            {Array.from({ length: quantity }).map((_, i) => {
                const star = i + 1
                return (
                    <label
                        key={star}
                        className="cursor-pointer"
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <input
                            type="radio"
                            className="hidden"
                            name="rating"
                            value={star}
                            checked={currentValue === star}
                            onChange={() => handleRating(star)}
                        />
                        <svg
                            className={`size-4 transition-colors ${star <= (hover || currentValue)
                                ? 'text-yellow-400 dark:text-yellow-500'
                                : 'text-gray-300 dark:text-neutral-600'
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                    </label>
                )
            }
            )}
        </div>
    );
};

export default Rating