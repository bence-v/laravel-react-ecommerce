<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Response;

Route::get('/', [ProductController::class, 'home'])->name('dashboard');
Route::get('/product/{product:slug}', [ProductController::class, 'show'])->name('product.show');
Route::get('/d/product/{department:slug}', [ProductController::class, 'byDepartment'])->name('product.byDepartment');


Route::controller(CartController::class)->prefix('/cart')->group(function () {
    Route::get('/','index')->name('cart.index');
    Route::post('/store/{product}', 'store')->name('cart.store');
    Route::put('/{product}', 'update')->name('cart.update');
    Route::delete('/{product}', 'destroy')->name('cart.destroy');
});
Route::post('/stripe/webhook', [StripeController::class, 'webhook'])->name('stripe.webhook');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/vendor/{vendor:store_name}', [VendorController::class, 'profile'])->name('vendor.profile');

    Route::middleware(['verified'])->group(function() {
        Route::post('/become-a-vendor',[VendorController::class, 'store'])->name('vendor.store');

        Route::post('/cart/check-out',[CartController::class, 'checkOut'])->name('cart.checkout');

        Route::get('/stripe/success', [StripeController::class, 'success'])->name('stripe.success');
        Route::get('/stripe/failure', [StripeController::class, 'failure'])->name('stripe.failure');
    });

    Route::post('/stripe/connect', [StripeController::class,'connect'])
        ->name('stripe.connect')
        ->middleware('role:' . App\Enums\RolesEnum::Vendor->value);

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])
        ->name('orders.show')
        ->middleware('can:show,order');

    Route::get('/addresses', [AddressController::class, 'index'])->name('addresses.index');
    Route::patch('/address', [AddressController::class, 'update'])->name('address.update');

});

Route::get('return', function () {
    $account = Auth::user()->retrieveStripeAccount();

    Auth::user()
        ->setStripeAccountStatus($account->details_submitted)
        ->save();

    return Route::has(Config::get('stripe_connect.routes.account.complete'))
        ? Response::redirectToRoute(Config::get('stripe_connect.routes.account.complete'))
        : Response::redirectTo('/');
})->name('stripe-connect.return');

Route::get('refresh', function () {
    return Response::redirectTo(Auth::user()->getStripeAccountLink());
})->name('stripe-connect.refresh');

require __DIR__.'/auth.php';
