'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import React, { useState } from 'react'; // <-- Import useState và React
import { Input } from "../ui/input";

interface PaginationWrapperProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    className?: string;
    isControlByInput?: boolean
}

function generatePageNumbers(
    current: number,
    total: number,
    sibling: number
): (number | "...")[] {
    const pages: (number | "...")[] = [];

    const start = Math.max(1, current - sibling);
    const end = Math.min(total, current + sibling);

    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total) {
        if (end < total - 1) pages.push("...");
        pages.push(total);
    }

    return pages;
}

export function PaginationControl({
    totalPages,
    currentPage,
    onPageChange,
    siblingCount = 1,
    className,
    isControlByInput = false,
}: PaginationWrapperProps) {
    if (totalPages <= 1) return null;

    const [jumpPage, setJumpPage] = useState(currentPage.toString());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setJumpPage(value);
    };

    const handleJumpToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newPage = parseInt(jumpPage);
            if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
                onPageChange(newPage);
            } else {
                setJumpPage(currentPage.toString());
            }
            e.currentTarget.blur();
        }
    };

    React.useEffect(() => {
        setJumpPage(currentPage.toString());
    }, [currentPage]);


    const pages = generatePageNumbers(currentPage, totalPages, siblingCount);

    return (
        <Pagination className={className}>
            <PaginationContent className="bg-secondary-800 p-2 rounded-xl">
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>

                {!isControlByInput ?
                    <>
                        {/* Page Numbers */}
                        {pages.map((page, idx) => {
                            if (page === "...") {
                                return (
                                    <PaginationItem key={`ellipsis-${idx}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        isActive={page === currentPage}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onPageChange(page as number); // Ép kiểu vì đã loại trừ "..."
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    </>
                    :
                    <PaginationItem className="hidden sm:flex mx-2 items-center gap-2">
                        <span className="text-sm">Trang</span>
                        <Input
                            className="text-center ring-none outline-none w-14 h-8 focus-visible:ring-0"
                            value={jumpPage}
                            onChange={handleInputChange}
                            onKeyDown={handleJumpToPage}
                        />
                        /
                        <span className="text-sm">{totalPages}</span>
                    </PaginationItem>
                }

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}