<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Http\Resources\AddressResource;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
    //
    public function index()
    {
        $addresses = request()->user()->addresses;

        return Inertia::render('User/Address/Index',[
            'addresses' => AddressResource::collection($addresses)->resolve()
        ]);
    }

    public function update(AddressRequest $request)
    {
        $request->user()->addresses()->updateOrCreate(['type' => $request->type], $request->validated());

        return back()->with('success', 'Address saved.');
    }
}
