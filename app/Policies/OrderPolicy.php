<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function show(User $user, Order $order)
    {
        return $order->user()->is($user);
    }
}
