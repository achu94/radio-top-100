'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className="flex items-center justify-center gap-2 mt-8 mb-8 p-4">
            {/* Previous Button */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-md border',
                    {
                        'pointer-events-none text-gray-300': currentPage === 1,
                        'text-gray-600 hover:bg-gray-100': currentPage > 1,
                    }
                )}
                aria-disabled={currentPage === 1}
            >
                <ArrowLeftIcon className="w-4 h-4" />
            </Link>

            {/* Page Numbers */}
            {allPages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span
                            key={index}
                            className="flex items-center justify-center h-10 w-10 text-gray-500"
                        >
                            ...
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={createPageURL(page)}
                        className={clsx(
                            'flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors',
                            {
                                'bg-blue-500 text-white border-blue-500': page === currentPage,
                                'text-gray-600 hover:bg-gray-100 border-gray-300': page !== currentPage,
                            }
                        )}
                    >
                        {page}
                    </Link>
                );
            })}

            {/* Next Button */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-md border',
                    {
                        'pointer-events-none text-gray-300': currentPage === totalPages,
                        'text-gray-600 hover:bg-gray-100': currentPage < totalPages,
                    }
                )}
                aria-disabled={currentPage === totalPages}
            >
                <ArrowRightIcon className="w-4 h-4" />
            </Link>
        </div>
    );
}