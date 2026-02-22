<?php

namespace App\Providers;

use App\Interfaces\StripeConnect;
use App\Services\CartService;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Stripe\StripeClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CartService::class, function () {
            return new CartService();
        });

        $this->app->bind(StripeConnect::class, function () {
            return new StripeClient(config('app.stripe_secret_key'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schedule::command('payout.vendors')
            ->monthlyOn(1,'00:00')
            ->withoutOverlapping();

        Vite::prefetch(concurrency: 3);
    }
}
