import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrigin = (pathname: string) => {
  const locale = pathname.split('/')[1];
  const cleanPath = pathname.replace(`/${locale}`, '') || '/';
  return cleanPath
}

export function generateSlug(
  input: string,
  opts?: {
    lower?: boolean;
    separator?: string;
    maxLength?: number;
    preserveUnicode?: boolean;
  }
): string {
  const { lower = true, separator = '-', maxLength, preserveUnicode = false } =
    opts ?? {};

  if (!input) return '';

  let str = input.trim();

  if (!preserveUnicode) {
    // Normalize and remove diacritics (accents)
    // NFD separates base chars and diacritic marks; remove marks (\p{M})
    // then we have pure ASCII-ish letters where possible.
    str = str.normalize('NFD').replace(/\p{M}/gu, '');
  } else {
    // keep original unicode characters but normalize to NFC for consistency
    str = str.normalize('NFC');
  }

  // Replace any sequence of non-allowed characters with separator.
  const pattern = preserveUnicode
    ? /[^\p{L}\p{N}]+/gu
    : /[^A-Za-z0-9]+/g;

  str = str.replace(pattern, separator);

  // Remove leading/trailing separators and collapse multiple separators
  const sepEsc = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape for regex
  const collapseRe = new RegExp(`${sepEsc}{2,}`, 'g');
  str = str.replace(collapseRe, separator);
  const trimRe = new RegExp(`^${sepEsc}|${sepEsc}$`, 'g');
  str = str.replace(trimRe, '');

  if (lower) str = str.toLowerCase();

  if (maxLength && maxLength > 0 && str.length > maxLength) {
    // cut and remove trailing separator if exists after cut
    str = str.slice(0, maxLength).replace(trimRe, '');
  }

  return str;
}

export function removeHtml(html: string) {
  return html.replace(/<[^>]+>/g, "")
}