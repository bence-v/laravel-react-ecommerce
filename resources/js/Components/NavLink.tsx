import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-heading font-medium leading-5 transition duration-150 ease-in-out  focus:outline-none text-gray-900 ' +
                (active
                    ? 'border-yellow-400  focus:border-yellow-700 '
                    : 'border-transparent  hover:border-yellow-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
