import React from 'react';
import { Order } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ProfileMenu from '@/Components/ProfileMenu';
import CurrencyFormatter from '@/Components/CurrencyFormatter';
function Show({order}: {order: Order}) {
    return (
        <AuthenticatedLayout
            header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
                My Order
            </h2>
        }>
            <Head title="My Order" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl p-4">
                    <div className="space-y-6">
                        <ProfileMenu />
                        <div className="bg-white p-3 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            <div className="grid grid-cols-2">
                                <div className="col-span-1 font-semibold flex flex-row gap-1 items-center">
                                    <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
                                    Order Date: {order.created_at}
                                </div>
                                <div className="col-span-1 font-semibold">
                                   # Order Number: {order.id}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            <div className="flex flex-rows">
                                <MapPinIcon className="h-6 w-6" aria-hidden="true" />
                                {Object.values(order.address).filter(Boolean).join(', ')}
                            </div>
                        </div>
                        <div className="bg-white p-4 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            <div className="flex flex-col gap-3">
                                <div className="col-span-1">
                                   <p className={'font-semibold'}>Order status: <span className={'capitalize'}>{order.status}</span></p>
                                    <p className={'text-sm '}>Vendor: {order.vendorUser.store_name}</p>
                                </div>
                                <hr/>
                                <div className="col-span-1">
                                    {order.orderItems.map(orderItem => (
                                        <div key={orderItem.id} className={"flex flex-row gap-4 mb-4"}>
                                            <div>
                                                <img src={orderItem.product.image} alt={orderItem.product.title} className={"h-48 w-48 object-cover"}/>
                                            </div>
                                            <div className={"flex flex-col"}>
                                                <p className={"font-semibold text-lg"}>{orderItem.product.title}</p>
                                                <p className="text-sm text-gray-600">Quantity: {orderItem.quantity}</p>
                                                {Array.isArray(orderItem.product.options) && orderItem.product.options.map((option, index) => (
                                                    <div key={index} className="text-sm text-gray-600">
                                                        <span className="font-medium">{option.name}: </span>
                                                        {option.options.map((opt, i) => (
                                                            <span key={i}>{opt.name}{i < option.options.length - 1 ? ', ' : ''}</span>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="grow place-content-end justify-items-end">
                                                <p>
                                                    <CurrencyFormatter amount={orderItem.quantity * orderItem.price} />
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">

                                </div>
                                <div className="col-span-1">
                                    <div className="col-span-1 flex flex-row-reverse">
                                        <p className="text-lg font-semibold">Total price: <CurrencyFormatter amount={order.total_price}/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default Show;
