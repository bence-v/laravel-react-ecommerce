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
