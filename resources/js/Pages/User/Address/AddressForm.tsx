import React, { FormEventHandler } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Address } from '@/types';

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

function AddressForm({address, addressType}: {address: Address|{}, addressType: string}) {
    const token = usePage().props.csrf_token;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            address_line_1: ('address_line_1' in address ? address.address_line_1 : '') || '',
            address_line_2: ('address_line_2' in address ? address.address_line_2 : '') || '',
            city: ('city' in address ? address.city : '') || '',
            zip: ('zip' in address ? address.zip : '') || '',
            type: addressType,
            primary: ('primary' in address ? address.primary : false) || false,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('address.update'));
    };
    return (
        <>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="address_line_1" value="Address Line 1*" />

                    <TextInput
                        id="address_line_1"
                        className="mt-1 block w-full"
                        value={data.address_line_1}
                        onChange={(e) => setData('address_line_1', e.target.value)}
                        required
                        isFocused
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address_line_1} />
                </div>

                <div>
                    <InputLabel htmlFor="address_line_2" value="Address Line 2" />

                    <TextInput
                        id="address_line_2"
                        className="mt-1 block w-full"
                        value={data.address_line_2}
                        onChange={(e) => setData('address_line_2', e.target.value)}
                        autoComplete="address2"
                    />

                    <InputError className="mt-2" message={errors.address_line_2} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City*" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        required
                        autoComplete="address-level2"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div>
                    <InputLabel htmlFor="zip" value="Zip*" />

                    <TextInput
                        id="zip"
                        className="mt-1 block w-full"
                        value={data.zip}
                        onChange={(e) => setData('zip', e.target.value)}
                        required
                        autoComplete="postal-code"
                    />

                    <InputError className="mt-2" message={errors.zip} />
                </div>
                <input type="hidden" name="_token" value={token} />
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 ">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </>
    );
}

export default AddressForm;
