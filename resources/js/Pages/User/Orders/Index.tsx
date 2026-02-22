import React from 'react';
import { Order, PageProps, PaginationProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import ProfileMenu from '@/Components/ProfileMenu';
import Pagination from '@/Components/Pagination';
import CurrencyFormatter from '@/Components/CurrencyFormatter';

function Index({ orders }: {orders: PaginationProps<Order>}) {

    const { currency_icon } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
                    My Orders
                </h2>
            }
        >
            <Head title="My Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl p-4">
                    <ProfileMenu />
                    <div className="space-y-6 mt-3">
                        <div className="bg-white p-4 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            {orders.data.map(order => (
                                <a key={order.id} href={route('orders.show', order.id)} className="grid grid-cols-4 shadow-xs border p-2 hover:shadow-lg rounded-lg">
                                    <div className="grid grid-rows-2 col-span-3">
                                        <div className="flex gap-1">
                                            <CalendarDaysIcon className="h-4 w-4 " aria-hidden="true" />
                                            <p className="text-l font-semibold">Order date: {order.created_at}</p>
                                        </div>
                                        <p className="text-sm mt-1">Order number: {order.id}</p>
                                        <div className="flex p-1 mt-4">
                                            <p className="capitalize ring-1 ring-green-500 px-3 text-sm rounded-lg bg-green-200">
                                                {order.status}</p>
                                        </div>
                                    </div>
                                    <p className="text-end content-end font-bold">
                                        <CurrencyFormatter amount={order.total_price}/>
                                    </p>
                                </a>
                            ))}
                        </div>
                        <div className="bg-white p-4 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            <Pagination links={orders.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
