import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default VendorDetails;

function VendorDetails(
    {className = ''}: {className?: string;}
) {
    const [showBecomeVendorConformation, setShowBecomeVendorConformation] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const user = usePage().props.auth.user;
    const token = usePage().props.csrf_token;

    const {
        data,
        setData,
        errors,
        post,
        processing,
        recentlySuccessful,
    } = useForm({
        store_name: user.vendor?.store_name || user.name.toLowerCase().replace(/\s+/g, '-'),
        store_address: user.vendor?.store_address,
    });

    const onStoreNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setData('store_name', ev.target.value.toLowerCase().replace(/\s+/g, '-'));
    }

    const closeModal = () => {
        setShowBecomeVendorConformation(false);
    };

    const updateVendor = (ev: React.FormEvent) => {
        ev.preventDefault();

        post(route('vendor.store'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
            },
            onError: (errors) => {

            },
        });
    };

    return (
    <section className={className}>
        <header>
            <h2 className="flex justify-between mb-8 text-lg font-medium text-gray-900">
                Vendor Details
                {user.vendor && (
                    <span className={`text-xs font-medium p-1 px-2 rounded border ${
                        user.vendor.status === 'pending' ? 'bg-yellow-200 border-yellow-400 text-yellow-800' :
                        user.vendor.status === 'rejected' ? 'bg-red-200 border-red-400 text-red-800' :
                        user.vendor.status === 'approved' ? 'bg-green-200 border-green-400 text-green-800' : ''
                    }`}>
                        {user.vendor.status_label}
                    </span>
                )}
            </h2>
        </header>
        <div>
            {!user.vendor && <PrimaryButton
                onClick={() => setShowBecomeVendorConformation(true)}
                disabled={processing}>
                Become a Vendor
            </PrimaryButton>}

            {user.vendor && (
                <>
                    <form onSubmit={updateVendor}>
                       <div className="mb-4">
                           <InputLabel htmlFor="name" value="Store Name" />
                           <TextInput
                               id="name"
                              className="mt-1 black w-full"
                              value={data.store_name}
                              onChange={onStoreNameChange}
                              required
                              isFocused
                              autoComplete="name"
                           />
                       </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="name" value="Store Index" />

                            <textarea
                                className="w-full rounded-md p-1 border-gray-300 shadow-sm"
                                value={data.store_address}
                                onChange={(e) => setData('store_address', e.target.value)}
                                placeholder="Enter Your Store Index"
                                cols={30}
                                rows={10}
                            ></textarea>
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Update</PrimaryButton>
                        </div>
                    </form>

                    <form action={route('stripe.connect')} method={'post'} className="my-8">
                        <input type="hidden" name="_token" value={token} />
                        {user.stripe_account_active && (
                            <div className="text-center text-gray-600 my-4 text-sm">
                                You are successfully connected to Stripe.
                            </div>
                        )}
                        <PrimaryButton disabled={user.stripe_account_active}>Connect to Stripe</PrimaryButton>
                    </form>
                </>
            )}
        </div>

        <Modal show={showBecomeVendorConformation} onClose={closeModal}>
            <form onSubmit={updateVendor} className="p-8">
                <h2 className="text-lg font-medium text-gray-900 mb-">Are you sure you want to become a vendor?</h2>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    </section>
    );
}
