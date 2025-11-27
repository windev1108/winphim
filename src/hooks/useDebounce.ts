import { useState, useEffect } from 'react';

/**
 * Custom hook để debounce giá trị input
 * @param value - Giá trị cần debounce
 * @param delay - Thời gian delay (ms), mặc định 500ms
 * @returns Giá trị đã được debounce
 */
export default function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set timeout để update giá trị sau khi delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: Clear timeout nếu value thay đổi trước khi delay kết thúc
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}