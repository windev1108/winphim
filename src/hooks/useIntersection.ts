import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions extends IntersectionObserverInit {
    // Kích hoạt callback chỉ một lần khi element xuất hiện
    triggerOnce?: boolean;
    // Delay trước khi bắt đầu observe (ms)
    delay?: number;
}

interface UseIntersectionReturn {
    // Ref để gán cho element cần observe
    ref: React.RefObject<HTMLElement>;
    // Element có đang visible không
    isIntersecting: boolean;
    // Entry object đầy đủ từ IntersectionObserver
    entry: IntersectionObserverEntry | null;
}

/**
 * Hook để detect khi element xuất hiện trong viewport
 * 
 * @example
 * // Cơ bản
 * const { ref, isIntersecting } = useIntersection();
 * return <div ref={ref}>{isIntersecting ? 'Visible!' : 'Hidden'}</div>;
 * 
 * @example
 * // Với options
 * const { ref, isIntersecting } = useIntersection({
 *   threshold: 0.5,
 *   triggerOnce: true,
 *   rootMargin: '100px'
 * });
 * 
 * @example
 * // Lazy load animation
 * const { ref, isIntersecting } = useIntersection({ triggerOnce: true });
 * return (
 *   <div ref={ref} className={isIntersecting ? 'fade-in' : 'opacity-0'}>
 *     Content
 *   </div>
 * );
 */
export const useIntersection = (
    options: UseIntersectionOptions = {}
): UseIntersectionReturn => {
    const {
        threshold = 0,
        root = null,
        rootMargin = '0px',
        triggerOnce = true, // Mặc định là true
        delay = 0,
    } = options;

    const ref = useRef<HTMLElement>(null);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Nếu đã trigger và chỉ trigger một lần thì không observe nữa
        if (triggerOnce && hasTriggered.current) return;

        // Delay nếu cần
        const timeoutId = setTimeout(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setEntry(entry);
                    setIsIntersecting(entry.isIntersecting);

                    // Đánh dấu đã trigger
                    if (entry.isIntersecting && triggerOnce) {
                        hasTriggered.current = true;
                        observer.disconnect();
                    }
                },
                {
                    threshold,
                    root,
                    rootMargin,
                }
            );

            observer.observe(element);

            // Cleanup
            return () => {
                observer.disconnect();
            };
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [threshold, root, rootMargin, triggerOnce, delay]);

    // @ts-ignore
    return { ref, isIntersecting, entry };
};

// Export default
export default useIntersection;