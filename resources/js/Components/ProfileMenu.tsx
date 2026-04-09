import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPinIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function ProfileMenu() {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-body">
                    <li>
                        <Link href={route('profile.edit')}
                           className="flex items-center justify-center p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand group hover:bg-yellow-400">
                            <UserCircleIcon className="h-4 w-4 mr-2" aria-hidden="true"/>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href={route('addresses.index')}
                           className="inline-flex items-center justify-center p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand group hover:bg-yellow-400"
                           aria-current="page">
                            <MapPinIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                            My Addresses
                        </Link>
                    </li>
                    <li>
                        <Link href={route('orders.index')}
                           className="inline-flex items-center justify-center p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand group hover:bg-yellow-400"
                           aria-current="page">
                            <ShoppingCartIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                            My Orders
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileMenu;
