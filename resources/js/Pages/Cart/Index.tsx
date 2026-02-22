import { GroupedCartItems, PageProps } from '@/types';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import CurrencyFormatter from '@/Components/CurrencyFormatter';
import CartItem from '@/Components/CartItem';
import PrimaryButton from '@/Components/PrimaryButton';
import { CreditCardIcon } from '@heroicons/react/24/outline';

function Index({
    csrf_token,
    cartItems,
    totalQuantity,
    totalPrice
               }: PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
    return (
        <Authenticated>
            <Head title={'Your Cart'}/>
            <div className="flex m-x-auto p-8 felx flex-col lg:flex-row gap-5">
                <div className="flex-1 p-8 bg-white dar:bg-gray-800 order-2 lg:order-1">
                    <div className="grid grid-cols-1">
                        <h2 className="text-xl font-bold">Shopping Cart</h2>
                        <div className="my-4">
                            {Object.keys(cartItems).length === 0 && (
                                <div className="py-2 text-gray-500 text-center">You don't have any items yet.</div>
                            )}
                            {Object.values(cartItems).map((cartItem) =>(
                                <div key={cartItem.user.id}>
                                    <div className={"flex items-center justify-between pb-4 border-b border-gray300 mb-4"}>
                                        <Link href="/public" className={"underline"}>
                                            {cartItem.user.name}
                                        </Link>
                                    <div>
                                        <form action={route('cart.checkout')} method="post">
                                            <input type="hidden" name="_token" value={csrf_token}/>
                                            <input type="hidden" name="vendor_id" value={cartItem.user.id}/>
                                            <button className="btn btn-sm btn-ghost flex gap-2">
                                                <CreditCardIcon className="size-6" />
                                                Pay Only for this seller
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                {cartItem.items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                              </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 lg:min-q-[260px] order-1 lg:order-2">
                    <div className="flex flex-col flex-1 justify-center gap-3 text-lg">
                        <p>Subtotal ({totalQuantity} items): &nbsp;
                        <CurrencyFormatter amount={totalPrice} /></p>
                        <form action={route('cart.checkout')} method="post" className="">
                            <input type="hidden" name="_token" value={csrf_token}/>
                            <PrimaryButton className="rounded-full flex gap-1">
                                <CreditCardIcon className="size-6" />
                                Proceed to checkout
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Index;
