import React, { FormEvent, useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { useForm, usePage } from '@inertiajs/react';
import MiniCartDropDown from '@/Components/MiniCartDropDown';
import { Department } from '@/types';
import { FormEventHandler } from 'react';
import { ArrowRightStartOnRectangleIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function Navbar() {
    const { departments, keyword } = usePage().props;
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

    // Helper function to chunk the array
    const chunkArray = (arr: Department[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const departmentChunks = chunkArray(departments as Department[], 6);

    const searchForm = useForm<{
        keyword:string;
    }>({
        keyword: keyword || '',
    });

    const {url} = usePage();

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        searchForm.get(url, {
            preserveScroll: true,
            preserveState: true
        });
    }

    return (
        <>
            <nav className="border-b border-gray-200 top-0 bg-neutral-50 w-full z-20 border-default">

                <div className="flex flex-wrap justify-between lg:flex-row md:flex-col items-center mx-auto max-w-screen-xl p-4 gap-2">

                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/img/logo_shop.png" className="h-7" alt="Flowbite Logo" />
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap text-heading">Super<span
                            className="text-yellow-500">Store</span></span>
                    </a>
                    <div className="hidden max-md:flex max-md:flex-row gap-4">
                        <MiniCartDropDown />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex cursor-pointer items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-lg md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-default">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                      d="M5 7h14M5 12h14M5 17h14" />
                            </svg>
                        </button>
                    </div>


                    <div id="mega-menu-full"
                         className={'items-center justify-between ' + (isMobileMenuOpen ? "hidden" : "") + ' w-full lg:flex lg:flex-row md:flex md:flex-col ms:flex-wrap md:w-auto md:order-1 gap-4  max-sm:mt-3'}>
                        <ul className="w-full">
                            <li className="w-full">
                                <div className="flex-none md:flex-wrap sm:w-full gap-4">
                                    <form onSubmit={onSubmit} className={'flex-1'}>
                                        <div className="w-full min-w-100">
                                            <div className="relative">
                                                <input type="text"
                                                       value={searchForm.data.keyword}
                                                       onChange={(e) => searchForm.setData('keyword', e.target.value)}
                                                       className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                       placeholder="Search..." />
                                                <button
                                                    className="absolute flex items-center gap-2 right-1 top-1 rounded bg-yellow-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow hover:bg-yellow-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                                                    type="submit"
                                                >
                                                    <MagnifyingGlassIcon className="h-4 w-4 " aria-hidden="true" />
                                                    <span>Search</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                        </ul>
                        <ul className="flex flex-col mt-4 justify-items-center font-medium md:flex-row xmd:flex-row md:mt-0 max-md:gap-4 md:space-x-7 rtl:space-x-reverse">
                            <li>
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="flex cursor-pointer px-0.5 pt-0.5 items-center justify-between w-full hover:border-yellow-700">
                                    Departments
                                    <svg className="w-4 h-4 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>
                            </li>
                            {user && (
                                <li className="max-sm:hidden">
                                    <MiniCartDropDown />
                                </li>
                            )}
                            {user && (<li><Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md cursor-pointer">
                                            <button
                                                type="button"
                                                className="inline-flex items-center py-2 px-3 max-sm:px-1 max-sm:py-1 text-heading hover:text-fg-brand hover:bg-neutral-secondary-soft md:hover:bg-transparent md:hover:text-fg-brand md:p-0 cursor-pointer"
                                            >Profile
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="left">

                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className={"flex gap-1 items-center"}
                                        >
                                            <UserCircleIcon className="h-4 w-4 " aria-hidden="true"/>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('orders.index')}
                                            className={"flex gap-1 items-center"}
                                        >
                                            <ShoppingCartIcon className="h-4 w-4 " aria-hidden="true" />
                                            My Orders
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="cursor-pointer flex gap-1 items-center"
                                        >
                                            <ArrowRightStartOnRectangleIcon className="h-4 w-4 " aria-hidden="true" color={"red"}/>
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown></li>)}
                            {!user && (
                                <>
                                    <li>
                                        <NavLink
                                            href={route('register')}
                                            active={route().current('register')}
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a
                                            href={route('login')}
                                            className="inline-flex items-center rounded-lg px-3 py-2 text-xs uppercase tracking-widest text-heading font-medium bg-yellow-500 text-neutral-50 focus:outline-none hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                        >
                                            Login
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                <div id="mega-menu-full-dropdown"
                     className={"mt-1 " + (showingNavigationDropdown ? '' : 'hidden') +
                         " bg-neutral-50 border-y border-gray-400 shadow-xs "}>
                    <div className="flex flex-row max-w-screen-xl px-4 py-5 mx-auto text-heading ">
                        {departmentChunks.map((chunk, index) => (
                            <ul key={index} aria-labelledby="mega-menu-full-dropdown-button"
                                className="px-3 border-r border-yellow-500">
                                {chunk.map((department) => (
                                    <li key={department.id}>
                                        <a href={route('product.byDepartment', department.slug)}
                                           className="block p-1 rounded-lg hover:underline hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700">
                                            <div className="font-semibold">{department.name}</div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </nav>
        </>

    );
}

export default Navbar;
