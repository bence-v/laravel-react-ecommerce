import React from 'react';
import {Department, PageProps, PaginationProps, Product} from '@/types';
import {Head} from "@inertiajs/react";
import ProductItem from '@/Components/ProductItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';

function Index({appName, department, products}: PageProps<{department: Department, products: PaginationProps<Product>}>) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>{department.name}</title>
                <meta name="title" content={department.meta_title}/>
                <meta name="description" content={department.meta_description}/>
                <link rel="canonical" href={route('product.byDepartment', department.slug)} />

                <meta property="og:title" content={department.name}/>
                <meta property="og:description" content={department.meta_description}/>
                <meta property="og:url" content={route('product.byDepartment', department.slug)}/>
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={appName}/>
            </Head>

            <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 py-4 w-full bg-gray-50/30 min-h-screen">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-5">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Electronics
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="flex-1">

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">

                            {products.data.map(product => (
                                <ProductItem product={product} key={product.id}/>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <Pagination links={products.meta.links} />
                </div>
            </main>

        </AuthenticatedLayout>
    );
}

export default Index;
