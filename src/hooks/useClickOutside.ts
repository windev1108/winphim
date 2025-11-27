import { useEffect } from "react";

export default function useClickOutside(
    refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
    handler: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        const refList = Array.isArray(refs) ? refs : [refs];

        const listener = (event: MouseEvent | TouchEvent) => {
            const isInside = refList.some(ref => {
                const el = ref.current;
                return el && el.contains(event.target as Node);
            });

            if (!isInside) {
                handler(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [refs, handler]);
}
