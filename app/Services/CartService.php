<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\VariationType;
use App\Models\VariationTypeOption;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartService
{
    private ?array $cachedCartItems = null;

    protected const COOKIE_NAME = 'cartItems';

    protected const COOKIE_LIFETIME = 60 * 24 *365; // For 1 year

    public function addItemToCart(Product $product, int $quantity = 1, array $optionIds = null)
    {
        if(!$optionIds) {
            $optionIds = $product->getFirstOptionsMap();
        }

        $price = $product->price;

        $price = $product->getPriceForOptions($optionIds);

        if(Auth::check()) {
            $this->saveItemToDatabase($product->id, $quantity, $price, $optionIds);
        } else {
            $this->saveItemToCookies($product->id, $quantity, $price, $optionIds);
        }
    }

    public function updateItemQuantity(int $productId, int $quantity, array $optionIds)
    {
        if(Auth::check()) {
            $this->updateItemQuantityInDatabase($productId, $quantity, $optionIds);
        } else {
            $this->updateItemQuantityInCookies($productId, $quantity, $optionIds);
        }
    }

    public function removeItemFromCart(int $productId, array $optionIds = null)
    {
        if(Auth::check()) {
            $this->removeItemFromDatabase($productId, $optionIds);
        } else {
            $this->removeItemFromCookies($productId, $optionIds);
        }
    }

    public function getCartItems(): array
    {
        try {
            if($this->cachedCartItems === null) {
                if(Auth::check()) {
                    $cartItems = $this->getCartItemsFromDatabase();
                } else {
                    $cartItems = $this->getCartItemsFromCookies();
                }

                $productIds = collect($cartItems)->map(fn($item) => $item['product_id']);

                $products = Product::whereIn('id',$productIds)
                    ->with('user.vendor')
                    ->forWebsite()
                    ->get()
                    ->keyBy('id');

                $cartItemData = [];

                foreach($cartItems as $cartItem) {
                    $product = data_get($products, $cartItem['product_id']);
                    if(!$product) continue;

                    $optionInfo = [];

                    $options = VariationTypeOption::with('variationType')
                        ->whereIn('id', $cartItem['option_ids'])
                        ->get()
                        ->keyBy('id');

                    $imageUrl = null;

                    foreach($cartItem['option_ids'] as $option_id)
                    {
                        $option = data_get($options, $option_id);

                        if(!$imageUrl) {
                            $imageUrl = $option->getFirstMediaUrl('images', 'small');
                        }

                        $optionInfo[] = [
                            'id' => $option_id,
                            'name' => $option->name,
                            'type' => [
                                'id' => $option->variationType->id,
                                'name' => $option->variationType->name
                            ],
                        ];
                    }

                    $cartItemData[] = [
                        'id' => $cartItem['id'],
                        'product_id' => $product->id,
                        'title' => $product->title,
                        'slug' => $product->slug,
                        'price' => $cartItem['price'],
                        'quantity' => $cartItem['quantity'],
                        'option_ids' => $cartItem['option_ids'],
                        'options' => $optionInfo,
                        'image' => $imageUrl ?: $product->getFirstMediaUrl('images', 'small'),
                        'user' => [
                            'id' => $product->created_by,
                            'name' => $product->user->vendor->store_name
                        ]
                    ];
                }

                $this->cachedCartItems = $cartItemData;
            }

            return $this->cachedCartItems;

        }catch (\Exception $e) {
            Log::error($e->getMessage(). PHP_EOL . $e->getTraceAsString());
            throw $e;
        }

        return [];
    }

    public function getTotalQuantity(): int
    {
        $totalQuantity = 0;
        foreach ($this->getCartItems() as $cartItem) {
            $totalQuantity += $cartItem['quantity'];
        }

        return $totalQuantity;
    }

    public function getTotalPrice(): float
    {
        $total = 0;

        foreach ($this->getCartItems() as $cartItem) {
            $total += $cartItem['price'] * $cartItem['quantity'];
        }

        return $total;
    }

    protected function updateItemQuantityInDatabase(int $productId, int $quantity, array $optionIds): void
    {
        $userId = Auth::id();

        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->whereJsonContains('variation_type_option_ids', $optionIds)
            ->first();

        if($cartItem) {
            $cartItem->update([
                'quantity' => $quantity
            ]);
        }
    }

    protected function updateItemQuantityInCookies(int $productId, int $quantity, array $optionIds): void
    {
        $cartItems = $this->getCartItemsFromCookies();

        ksort($optionIds);

        $itemKey = $productId . '_' . json_encode($optionIds);

        if(isset($cartItems[$itemKey])) {
            $cartItems[$itemKey]['quantity'] = $quantity;
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }

    protected function saveItemToDatabase(int $productId, int $quantity, $price, array $optionIds): void
    {
        $userId = Auth::id();
        ksort($optionIds);

        $carItem = CartItem::where('user_id', $userId)
                        ->where('product_id', $productId)
                        ->whereJsonContains('variation_type_option_ids', $optionIds)
                        ->first();


        if($carItem) {
            $carItem->update([
                'quantity' => DB::raw('quantity + ' . $quantity),
            ]);
        } else {
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'variation_type_option_ids' => $optionIds,
            ]);
        }
    }

    protected function saveItemToCookies(int $productId, int $quantity, $price, array $optionIds): void
    {
        $cartItems = $this->getcartItemsFromCookies();

        ksort($optionIds);

        $itemKey = $productId . '_' . json_encode($optionIds);


        if(isset($cartItems[$itemKey]))
        {
            $cartItems[$itemKey]['quantity'] += $quantity;
            $cartItems[$itemKey]['price'] = $price;
        } else {
            $cartItems[$itemKey] = [
                'id' => \Str::uuid(),
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'option_ids' => $optionIds // @TODO Check
            ];
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }

    protected function removeItemFromDatabase(int $productId, array $optionIds): void
    {
        $userId = Auth::id();
        ksort($optionIds);

        CartItem::where('user_id',$userId)
            ->where('product_id', $productId)
            ->whereJsonContains('variation_type_option_ids', $optionIds)
            ->delete();
    }

    protected function removeItemFromCookies(int $productId, array $optionIds): void
    {
        $cartItems = $this->getCartItemsFromCookies();

        ksort($optionIds);

        $cartKey = $productId . '_' . json_encode($optionIds);

        unset($cartItems[$cartKey]);

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }

    protected function getCartItemsFromDatabase()
    {
        $userId = Auth::id();

        $cartItems = CartItem::where('user_id', $userId)
            ->get()
            ->map(fn($cartItem) => [
                'id' => $cartItem->id,
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
                'option_ids' => $cartItem->variation_type_option_ids,
            ])
            ->toArray();

        return $cartItems;
    }

    protected function getCartItemsFromCookies()
    {
        return json_decode(Cookie::get(self::COOKIE_NAME, '[]'), true);
    }

    public function getCartItemsGrouped(): array {
        $cartItems = $this->getCartItems();

        return collect($cartItems)
            ->groupBy(fn ($item) => $item['user']['id'])
            ->map(fn($items, $userId) => [
               'user' => $items->first()['user'],
               'items' => $items->toArray(),
                'total_quantity' => $items->sum('quantity'),
                'total_price' => $items->sum(fn ($item) => $item['price'] * $item['quantity']),
            ])
            ->toArray();
    }

    public function moveCartItemsToDatabase($userId): void
    {
        $cartItems = $this->getCartItemsFromCookies();

        foreach($cartItems as $itemKey => $cartItem)
        {
            $existingItem = CartItem::where('user_id', $userId)
                ->where('product_id', $cartItem['product_id'])
                ->whereJsonContains('variation_type_option_ids', $cartItem['option_ids'])
                ->first();

            if($existingItem) {
                $existingItem->update([
                    'quantity' => $existingItem->quantity + $cartItem['quantity'],
                    'price' => $cartItem['price'],
                ]);
            } else {
                CartItem::create([
                    'user_id' => $userId,
                    'product_id' => $cartItem['product_id'],
                    'quantity' => $cartItem['quantity'],
                    'price' => $cartItem['price'],
                    'variation_type_option_ids' => $cartItem['option_ids'],
                ]);
            }

            Cookie::queue(self::COOKIE_NAME, '', -1);
        }
    }
}
