import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../lib/constants";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const timeoutId = setTimeout(() => {
      setMatches(mediaQuery.matches);
    }, 0);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timeoutId);
    };
  }, [query]);

  return matches;
}


// ===== Utility Hooks - Breakpoints =====

export function useIsXs() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.xs}px)`);
}

export function useIsSm() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
}

export function useIsMd() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
}

export function useIsLg() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export function useIsXl() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
}

export function useIs2xl() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS["2xl"]}px)`);
}

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

export function useIsTablet() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`);
}

export function useIsDesktop() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export function useIsDarkMode() {
  return useMediaQuery(`(prefers-color-scheme: dark)`);
}

export function usePrefersReducedMotion() {
  return useMediaQuery(`(prefers-reduced-motion: reduce)`);
}

export function useIsPortrait() {
  return useMediaQuery(`(orientation: portrait)`);
}

export function useIsLandscape() {
  return useMediaQuery(`(orientation: landscape)`);
}