import React from 'react';

export default function ProductCarouselSkeleton() {
    return (
        <div className="relative w-full">
            <div
                className="flex flex-row overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {[...Array(7)].map((_, index) => (
                    <div key={index} className="min-w-[250px]  max-w-sm w-56 md:w-52 sm:w-64 max-sm:w-84 bg-white p-2 mb-3 border-2 border-slate-300 border-default rounded-xl shadow-xs shrink-0">
                        <div className="relative">
                            <div className="flex animate-pulse items-center justify-center h-52 mb-4 bg-neutral-100 rounded-base">
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
                            <div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-3 mb-2.5 ms-2"></div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-12 mb-2.5 ms-2"></div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-5 mb-2.5 ms-2"></div>
                                <div className="h-2 animate-pulse inline-block bg-neutral-100 rounded-full w-12 mb-2.5 ms-2"></div>
                            </div>
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
                ))}
            </div>
        </div>
    );
}
