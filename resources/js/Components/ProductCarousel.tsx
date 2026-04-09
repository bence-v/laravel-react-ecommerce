import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import CurrencyFormatter from '@/Components/CurrencyFormatter';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';
import ProductItem from '@/Components/ProductItem';

function ProductCarousel({products}: { products:Product[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full">
            <div
                ref={scrollContainerRef}
                className="flex flex-row overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.length === 0 && [...Array(7)].map((_,index) => (
                    <>
                        <div className="min-w-[250px]  max-w-sm w-56 md:w-52 sm:w-64 max-sm:w-84 bg-white p-2 mb-3 border-2 border-slate-300 border-default rounded-xl shadow-xs shrink-0">
                            <div className="relative">
                                <div
                                    className="flex animate-pulse items-center justify-center h-52 mb-4 bg-neutral-100 rounded-base">
                                    <svg className="w-11 h-11 text-fg-disabled" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path
                                            className="stroke-neutral-300"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <div className="space-x-3 mb-4">
                                    <span className="bg-brand-softer border-3 border-neutral-200 px-1.5 py-1 rounded-sm inline-flex items-center gap-1">
                                       <div className="h-2 animate-pulse inline-block bg-neutral-200 rounded-full w-3"></div>
                                       <div className="h-2 animate-pulse inline-block bg-neutral-200 rounded-full w-5"></div>
                                       <div className="h-2 animate-pulse inline-block bg-neutral-200 rounded-full w-3"></div>
                                    </span>
                                </div>
                                <div className="h-2.5 bg-neutral-100 rounded-full w-36 mb-4"></div>
                            <p>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-3 mb-2.5 ms-2"></div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-12 mb-2.5 ms-2"></div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-5 mb-2.5 ms-2"></div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-12 mb-2.5 ms-2"></div>
                            </p>
                            <div className="flex flex-col gap-3">
                            <div className="mt-6">
                                    <span className="text-l font-extrabold text-heading">
                                       <div className="h-5 bg-neutral-100 rounded-full w-12"></div>
                                    </span>
                                    </div>
                                    <button type="button"
                                            className="inline-flex animate-pulse w-full h-10  bg-gradient-to-r from-neutral-100 to-neutral-200  rounded-lg">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
                {products.map(product => (
                    <ProductItem product={product} key={product.id}/>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                type="button"
                onClick={scrollLeft}
                className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 focus:outline-none"
            >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Previous</span>
            </button>

            <button
                type="button"
                onClick={scrollRight}
                className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 focus:outline-none"
            >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Next</span>
            </button>
        </div>
    );
}
export default ProductCarousel;
