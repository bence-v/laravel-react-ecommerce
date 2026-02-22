import { PageProps, Product, VariationTypeOption } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Carousel from '@/Components/Carousel';
import CurrencyFormatter from '@/Components/CurrencyFormatter';
import { arraysAreEqual } from '@/helpers';

function Show({product, variationOptions, appName}: PageProps<{
    product: Product,
    variationOptions: number[],
}>) {

    const form = useForm<{
       option_ids: Record<string, number>;
       quantity: number;
       price: number | null;
    }>({
        option_ids: {},
        quantity: 1,
        price: null
    });

    const {url} = usePage();
    const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>([]);

    const images = useMemo(() => {
        for (let typeId in selectedOptions)
        {
            const option = selectedOptions[typeId];
            if(option.images.length > 0) return option.images;
        }
        return product.images;
    }, [product, selectedOptions]);

    const computedProduct = useMemo(() => {
        const selectedOptionIds = Object.values
        (selectedOptions)
            .map(op => op.id)
            .sort();

        for(let variation of product.variations) {
            const optionIds = variation.variation_type_option_ids.sort();
            if(arraysAreEqual(selectedOptionIds, optionIds)) {
                return {
                    price: variation.price,
                    quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
                }
            }
        }

        return {
            price: product.price,
            quantity: product.quantity,
        }
    }, [product, selectedOptions]);

    useEffect(() => {
        for(let type of product.variationTypes)
        {
            const selectedOptionId: number = variationOptions[type.id];
            chooseOption(type.id,
                type.options.find(op => op.id == selectedOptionId) || type.options[0],
                false
            )
        }

    }, []);

    const getOptionIdsMap = (newOptions: object) => {
        return Object.fromEntries(
            Object.entries(newOptions).map(([a,b]) => [a,b.id])
        );
    };

    const chooseOption = (
        typeId: number,
        option: VariationTypeOption,
        updateRouter: boolean = true
    )=> {
        setSelectedOptions((prevSelectedOptions) => {
            const newOptions = {
                ...prevSelectedOptions,
                [typeId]: option,
            };

            if(updateRouter) {
                router.get(url, {
                    options: getOptionIdsMap(newOptions)
                }, {
                    preserveScroll: true,
                    preserveState: true
                })
            }

            return newOptions;
        });
    }

    const onQuantityChange =
        (ev: React.ChangeEvent<HTMLSelectElement>) => {
        form.setData('quantity', parseInt(ev.target.value));
    };

    const renderProductVariationTypes = () => {
      return (
            product.variationTypes.map((type, i) => (
               <div key={type.id}>
                   <b>{type.name}</b>
                   {type.type === 'Image' &&
                       <div className="flex gap-4 mb-4">
                           {type.options.map(option => (
                               <div onClick={() => chooseOption(type.id, option)} key={option.id}>
                                   {option.images.length > 0 && <img src={option.images[0].thumb} alt="" className={'w-[60px] h-[80px] cursor-pointer ' + (selectedOptions[type.id]?.id === option.id ? ' outline outline-4 outline-yellow-500' : '')}/>}
                               </div>
                               ))}
                       </div>}
                   {type.type === 'Radio' &&
                       <div>
                           {type.options.map(option => (
                               <label className="group flex cursor-pointer items-center gap-3 my-3">
                                   <input onChange={() => chooseOption(type.id, option)} id={'variation_type_' + type.id} checked={selectedOptions[type.id]?.id === option.id} key={option.id} type="radio" value={option.id} name={'variation_type_' + type.id} aria-label={option.name} className="peer sr-only" />
                                   <div
                                       className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white transition-all duration-200 peer-focus:ring-2 peer-focus:ring-yellow-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-500 peer-checked:[&_div]:scale-100">
                                       <div className="h-2 w-2 scale-0 rounded-full bg-white transition-transform duration-200"></div>
                                   </div>
                                   <span
                                       className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">{option.name}</span>
                               </label>
                         ))}
                       </div>}
               </div>
            ))
        )
    };

    useEffect(() => {
        const idsMap = Object.fromEntries(
            Object.entries(selectedOptions)
                .map(([typeId, option] :[string, VariationTypeOption])=>[typeId, option.id])
        );
        form.setData('option_ids', idsMap);
    }, [selectedOptions]);

    const renderAddToCartButton = () => {
        return (
            <div className="mb-8 relative flex flex-col gap-4">
                <label>Quantity:</label>
                <select value={form.data.quantity} onChange={onQuantityChange}
                        className={'w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 pr-8 text-sm leading-tight text-gray-700 focus:border-yellow-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-sm transition duration-200 ease-in-out'}>
                    {Array.from({ length: Math.min(10, computedProduct.quantity) })
                        .map((el, i) => (
                            <option value={i + 1} key={i + 1}>{i + 1}</option>
                        ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 bottom-4 right-1 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
                <button onClick={addToCart}
                        className="text-white bg-yellow-500 cursor-pointer hover:bg-yellow-800 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Add
                    to Cart
                </button>
            </div>
        )
    };

    const addToCart = () => {
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
            }
        });
    };


    return (
        <Authenticated>
            <Head>
                <title>{product.title}</title>
                <meta name="title" content={product.meta_title}/>
                <meta name="description" content={product.meta_description}/>
                <link rel="canonical" href={route('product.byDepartment', product.slug)} />

                <meta property="og:title" content={product.title}/>
                <meta property="og:description" content={product.meta_description}/>
                <meta property="og:url" content={route('product.byDepartment', product.slug)}/>
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={appName}/>
            </Head>
            <div className="container mx-auto p-8">
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-7">
                        <Carousel images={images} />
                    </div>
                    <div className="col-span-5">
                        <h1 className="text-2xl">{product.title}</h1>

                        <p className={'mb-8'}>
                            <span>by </span>
                            <Link href={route('vendor.profile', product.user.store_name)} className="hover:underline">{product.user.name}</Link>
                            <span> in </span>
                            <Link href={route('product.byDepartment', product.department.slug)} className="hover:underline">{product.department.name}</Link>
                        </p>

                        <div>
                            <div className="text-3xl font-semibold">
                                <CurrencyFormatter amount={computedProduct.price} />
                            </div>
                        </div>

                        {renderProductVariationTypes()}

                        {computedProduct.quantity != undefined && computedProduct.quantity < 10 &&
                            <div className="text-red-500 font-semibold my-4">
                                <span>Only {computedProduct.quantity} left</span>
                            </div>
                        }

                        {renderAddToCartButton()}

                        <b className="text-xl">About the Item</b>
                        <div className="wysiwyg-output" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Show;
