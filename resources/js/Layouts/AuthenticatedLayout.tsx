import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import Navbar from '@/Components/Navbar';
import { usePage } from '@inertiajs/react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {

    const props = usePage().props;

    const [successMessages, setSuccessMessages] = useState<any[]>([]);
    const timeoutRefs = useRef<{[key: number]: ReturnType<typeof setTimeout>}>({});

    useEffect(() => {
        if(props.success.message) {
            const newMessage = {
                ...props.success,
                id: props.success.time,
            };

            setSuccessMessages((prevMessages) => [newMessage, ...prevMessages]);

            const timeoutId = setTimeout(() => {
                setSuccessMessages((prevMessages) =>
                    prevMessages.filter((msg) => msg.id !== newMessage.id));

                delete timeoutRefs.current[newMessage.id];

            }, 5000);

            timeoutRefs.current[newMessage.id] = timeoutId;
        }
    }, [props.success]);

    return (
        <div className="min-h-screen bg-gray-100 ">
            <Navbar />

            {header && (
                <header className="bg-white shadow ">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {successMessages.length > 0 && (
                <>
                    {successMessages.map((msg) => (
                        <div id="toast-default" key={msg.id}
                             className="flex z-[1000] bg-white absolute top-13 right-5 items-center w-full max-w-xs p-2 text-body bg-neutral-primary-soft rounded-lg shadow-xs border border-default"
                             role="alert">
                            <svg className="w-6 h-6 text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" />
                            </svg>
                            <div className="ms-2.5 text-sm border-s border-default ps-3.5">{msg.message}</div>
                        </div>
                    ))}
                </>
            )}



            <main>{children}</main>
        </div>
    );
}
