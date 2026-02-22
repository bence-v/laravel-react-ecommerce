<?php

namespace App\Http\Controllers;

use App\Enums\RolesEnum;
use App\Enums\VendorStatusEnum;
use App\Http\Resources\ProductListResource;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function profile(Request $request, Vendor $vendor)
    {
        $keyword = $request->query('keyword');
        $products = Product::query()
            ->forWebsite()
            ->when($keyword, function($query, $keyword) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('title', 'LIKE', "%{$keyword}%")
                        ->orWhere('description', 'LIKE', "%{$keyword}%");
                });
            })
            ->where('created_by',$vendor->user_id)
            ->paginate();

        return Inertia::render('Vendor/Profile', [
            'vendor' => $vendor,
            'products' => ProductListResource::collection($products)
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'store_name' => [
                'required',
                'regex:/^[a-z0-9-]+$/',
                Rule::unique('vendors','store_name')->ignore($user->id,'user_id'),
            ],
            'store_address' => 'nullable'
        ], [
           'store_name.regex' => 'Store name must only contain lowercase letters, numbers, and hyphens.',
        ]);

        $user = $request->user();
        $vendor = $user->vendor ?: new Vendor();

        $vendor->user_id = $user->id;
        $vendor->status = VendorStatusEnum::Pending->value;
        $vendor->store_name = $request->input('store_name');
        $vendor->store_address = $request->input('store_address');
        $vendor->save();

        $user->assignRole(RolesEnum::Vendor);

        return back()->with('success', 'Your application is now pending!');
    }
}
