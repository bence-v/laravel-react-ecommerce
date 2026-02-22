import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import CurrencyFormatter from '@/Components/CurrencyFormatter';
import { productRoute } from '@/helpers';
import NavLink from '@/Components/NavLink';

function MiniCartDropDown({className = ''}) {
    const {totalQuantity, totalPrice, miniCartItems} = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={'relative inline-block text-left ' + (className) }>
            <div className="relative inline-flex">
                <button             onClick={() => setIsOpen(!isOpen)}
                    className="flex cursor-pointer items-center h-10 w-10 rounded-md bg-yellow-400  py-2.5 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-yellow-300 focus:shadow-none active:bg-yellow-300 hover:bg-yellow-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-4 h-4">
                        <path fillRule="evenodd"
                              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
                {totalQuantity !== 0 &&
                    <span
                    className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 py-1 px-1 text-xs font-medium leading-none text-white content-['']">
                    {totalQuantity}</span>
                }

            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-0 cursor-default"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="absolute right-0 z-10 mt-2 w-112 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-2 px-3 grid grid-cols-1 gap-1">
                            <span className={"text-lg font-bold"}>{totalQuantity} items</span>
                            {miniCartItems.length === 0 &&
                                <div className={'py-2 text-gray-500 text-center'}>You don't have any items yet.</div>}
                            {miniCartItems.length > 0 &&
                            miniCartItems.map((item) => (
                                <div key={item.id} className={'flex gap-4 p3'}>
                                    <Link href={productRoute(item)}
                                        className={'w-16 h-15 flex justify-center items-center'}>
                                        <img src={item.image} alt={item.title} className={'max-w-full max-h-full'}/>
                                    </Link>
                                    <div className={'flex-1'}>
                                        <h3 className={'mb-3 font-semibold'}>
                                            <Link href={productRoute(item)}>{item.title}</Link>
                                        </h3>
                                        <div className={'flex justify-between text-sm'}>
                                             <div>
                                                 Quantity: {item.quantity}
                                             </div>
                                            <div>
                                                <CurrencyFormatter amount={item.quantity * item.price} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                            <span className="text-lg font-bold">
                                Subtotal: <CurrencyFormatter amount={totalPrice} />
                            </span>
                            <Link href={route('cart.index')} className={'rounded-md mt-2 bg-yellow-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-yellow-300 focus:shadow-none active:bg-yellow-600 hover:bg-yellow-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'}>View Cart</Link>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MiniCartDropDown;
