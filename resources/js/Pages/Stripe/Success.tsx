import {Head, Link} from '@inertiajs/react';
import CurrencyFormatter from '@/Components/CurrencyFormatter';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {PageProps, Order} from '@/types';


function Success({orders}: PageProps<{orders:Order[]}>) {
    return (
        <Authenticated>
            <Head title="Payment was Completed" />
            <div className="w-[480px] mx-auto py-8 px-4">
                <div className="flex flex-col gap-2 items-center">
                    <div className="text-xl text-emerald-600">
                        <CheckCircleIcon className={"size-24"}/>
                    </div>
                    <div className="text-3xl">
                        Payment was Completed!
                    </div>
                </div>
                <div className="my-6 text-lg">
                    Thanks f
                    or your purchase. Soon your order will be getting processed.
                </div>
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-lg p-6 mb-4">
                        <h3 className="text-3xl mb-3">Order Summary</h3>
                        <div className="flex justify-between mb-2 font-bold">
                            <div className="text-gray-400">
                                Seller
                            </div>
                            <div>
                                <Link href="#" className="hover:underline">
                                    {order.vendorUser.store_name}
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-between mb-3">
                        <div className="text-gray-400">
                            Items
                        </div>
                            <div>
                                {order.orderItems.length}
                            </div>
                        </div>
                        <div className="flex justify-between mb-3">
                            <div className="text-gray-400">
                                Total
                            </div>
                            <div>
                                <CurrencyFormatter amount={order.total_price} />
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <Link href={route('dashboard')} className="text-white bg-green-400 rounded-lg hover:bg-green-500 focus:ring-4 focus:ring-green-500 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                Back To Home
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Authenticated>
    );
}

export default Success;
