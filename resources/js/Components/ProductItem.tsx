import React from 'react';
import { Product } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import CurrencyFormatter from '@/Components/CurrencyFormatter';

function ProductItem({product}: {product: Product}) {
    const form = useForm<{
        option_ids: Record<string, number>;
        quantity: number;
    }>({
        option_ids: {},
        quantity: 1,
    });

    const addToCart = () => {
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
            }
        });
    };
    return (
        <>
            <div className="min-w-[250px] max-w-sm w-56 md:w-52 sm:w-64 max-sm:w-84 bg-white p-2 mb-3 border-2 border-slate-300 border-default rounded-xl shadow-xs shrink-0">
                <div className="relative">
                    <a href={route('product.show', { slug: product.slug })}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-xl h-52 w-full object-fit mb-4"
                        />
                    </a>
                    <span
                        className="absolute font-bold top-0.5 right-0.5 grid min-h-[30px] min-w-[30px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-lg  bg-red-600 py-1 px-1 text-xs text-white border border-white">
                                -15%
                            </span>
                </div>

                <div>
                    <div className="space-x-3 mb-4">
                                <span
                                    className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">4.8 out of 5</span>
                    </div>
                    <Link className={'hover:underline'} href={route('product.show', product.slug)}>
                        <h6 className="text-l text-heading font-semibold tracking-tight">{product.title}</h6>
                    </Link>
                    <p>
                        <span>by </span>
                        <Link href={route('vendor.profile', product.user.store_name)} className="text-sm hover:underline">{product.user.name}</Link>
                        <span> in </span>
                        <Link href={route('product.byDepartment', product.department.slug)} className="text-sm hover:underline">{product.department.name}</Link>
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="mt-6">
                                    <span className="text-l font-extrabold text-heading">
                                                                        <CurrencyFormatter amount={product.price} />
                                    </span>
                        </div>
                        <button type="button"
                                className="inline-flex w-full items-center cursor-pointer text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5">
                            <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="12" height="12" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                            </svg>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItem;
