import Rect, {useState} from 'react';
import {Link, router, useForm} from "@inertiajs/react";
import {CartItem as CartItemType} from "@/types";
import TextInput from "@/Components/TextInput";
import CurrencyFormatter from "@/Components/CurrencyFormatter";
import {productRoute} from "@/helpers";
function CartItem({item}: {item: CartItemType}) {
    const deleteForm = useForm({
        option_ids: item.option_ids
    });

    const [error, setError] = useState('');

    const onDeleteClick = () => {
        deleteForm.delete(route('cart.destroy', item.product_id), {
            preserveScroll: true
        })
    };

    const handleQuantityChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        router.put(route('cart.update', item.product_id), {
            quantity: ev.target.value,
            option_ids: item.option_ids
        },{
            preserveScroll: true,
            onError: (error) => setError(Object.values(error)[0]),
        })
    }
    return (
        <>
            <div key={item.id} className="flex gap-6 p-3">
                <Link href={productRoute(item)} className="w-32 min-w-32 min-h-32 flex justify-center self-start" >
                    <img src={item.image} alt={item.title} className="max-w-full max-h-full" />
                </Link>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <h3 className="mb-3 text-sm font-semibold">
                            <Link href={productRoute(item)}>{item.title}</Link>
                        </h3>
                        <div className="text-sm">
                            {item.options.map((option) => (
                                <div key={option.id}>
                                    <strong className={"text-bold"}>{option.type.name}:</strong>
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-lg">
                        <div className="flex gap-3 items-center">
                            <div className="">Quantity:</div>
                            <div className={error ? 'tooltip tooltip-open tooltip-error' : ''} data-zip={error}>
                                <TextInput type="number" defaultValue={item.quantity} onBlur={handleQuantityChange} className="input-sm w-16"></TextInput>
                            </div>
                            <button onClick={() => onDeleteClick()} className="ml-3 cursor-pointer bg-white border border-red hover:bg-red-400 hover:text-white focus:ring-4 focus:ring-white font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none">Delete</button>
                            <button className="cursor-pointer">Save For Later</button>
                        </div>
                        <div className="text-sm">
                            <CurrencyFormatter amount={item.price * item.quantity} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </>
    );
}

export default CartItem;
