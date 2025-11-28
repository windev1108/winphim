import { useEffect } from "react";

export function useLockScrollBody(locked: boolean = true) {
    useEffect(() => {
        const body = document.body;

        if (locked) {
            const scrollY = window.scrollY;
            body.style.position = "fixed";
            body.style.top = `-${scrollY}px`;
            body.style.left = "0";
            body.style.right = "0";
            body.style.overflow = "hidden";
            body.setAttribute("data-scroll-lock", scrollY.toString());
        } else {
            const scrollY = body.getAttribute("data-scroll-lock");
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.overflow = "";
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY, 10));
            }
            body.removeAttribute("data-scroll-lock");
        }

        return () => {
            // cleanup khi component unmount
            const scrollY = body.getAttribute("data-scroll-lock");
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.overflow = "";
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY, 10));
                body.removeAttribute("data-scroll-lock");
            }
        };
    }, [locked]);
}
