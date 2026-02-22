<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderViewResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    //
    public function index()
    {
        $userOrders = request()
            ->user()
            ->orders()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('User/Orders/Index', [
                'orders' =>  OrderViewResource::collection($userOrders),
                ]);
    }

    public function show(Order $order)
    {
        return Inertia::render('User/Orders/Show', [
            'order' => new OrderViewResource($order),
        ]);
    }
}
