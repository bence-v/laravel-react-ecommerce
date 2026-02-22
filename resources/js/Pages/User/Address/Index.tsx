import React, { FormEventHandler } from 'react';
import { Address } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import ProfileMenu from '@/Components/ProfileMenu';
import AddressForm from '@/Pages/User/Address/AddressForm';

function Index({addresses}: {addresses: Address[]}) {

    const homeAddress = addresses.find(a => a.type === 'home') || {};
    const companyAddress = addresses.find(a => a.type === 'company') || {};

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
                    My Addresses
                </h2>
            }>
            <Head title="My Address" />


            <div className="py-12">

                <div className="mx-auto max-w-4xl p-4">
                    <div className="space-y-6">
                        <ProfileMenu />
                        <div className="bg-white p-3 flex flex-col gap-4 shadow sm:rounded-lg sm:p-8">
                            <div className="text-lg flex flex-row place gap-2">
                                <HomeModernIcon className="h-6 w-6" aria-hidden="true" />
                                Home Address
                            </div>
                            <AddressForm address={homeAddress} addressType={'home'} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default Index;
