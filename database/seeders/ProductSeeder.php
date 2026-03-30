<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Department;
use App\Models\User;
use App\Models\VariationType;
use App\Models\VariationTypeOption;
use App\Models\ProductVariation;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $vendor = User::whereHas('roles', function ($query) {
            $query->where('name', 'vendor');
        })->first();

        $fashionDepartment = Department::where('name', 'Fashion')->first();
        $electronicsDepartment = Department::where('name', 'Electronics')->first();

        $fashionCategory = Category::where('name','Fashion')->first();
        $electronicsCategory = Category::whereIn('name',['Electronics', 'Computers', 'Automotive'])->pluck('id');

        // Create 10 clothing products with variations
        for ($i = 1; $i <= 10; $i++) {
            $product = Product::create([
                'title' => 'T-Shirt ' . $i,
                'slug' => Str::slug('T-Shirt ' . $i),
                'category_id' => $fashionCategory->id,
                'description' => 'A comfortable and stylish T-shirt.',
                'price' => rand(1500, 4000) / 100,
                'quantity' => rand(10, 100),
                'created_by' => $vendor->id,
                'department_id' => $fashionDepartment->id,
                'status' => 'published',
                'updated_by' => $vendor->id,
            ]);

            $product->addMediaFromUrl("https://picsum.photos/seed/{$product->SKU}/800/600")->toMediaCollection('images');

            // Variations
            $colorType = VariationType::create(['product_id' => $product->id, 'name' => 'Color', 'type' => 'Radio']);
            $sizeType = VariationType::create(['product_id' => $product->id, 'name' => 'Size', 'type' => 'Radio']);

            $colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
            $sizes = ['S', 'M', 'L', 'XL'];

            $colorOptions = [];
            foreach ($colors as $color) {
                $colorOptions[] = VariationTypeOption::create(['variation_type_id' => $colorType->id, 'name' => $color]);
            }

            $sizeOptions = [];
            foreach ($sizes as $size) {
                $sizeOptions[] = VariationTypeOption::create(['variation_type_id' => $sizeType->id, 'name' => $size]);
            }

            foreach ($colorOptions as $colorOption) {
                foreach ($sizeOptions as $sizeOption) {
                    ProductVariation::create([
                        'product_id' => $product->id,
                        'variation_type_option_ids' => [$colorOption->id, $sizeOption->id],
                        'price' => $product->price + rand(-2, 2),
                        'quantity' => rand(5, 20),
                    ]);
                }
            }
        }

        // Create 20 electronics products
        for ($i = 1; $i <= 20; $i++) {
            $product = Product::create([
                'title' => 'Electronic Gadget ' . $i,
                'slug' => Str::slug('Electronic Gadget ' . $i),
                'category_id' => $electronicsCategory->random(),
                'description' => 'A cool and useful electronic gadget.',
                'price' => rand(5000, 50000) / 100,
                'quantity' => rand(5, 50),
                'created_by' => $vendor->id,
                'department_id' => $electronicsDepartment->id,
                'status' => 'published',
                'updated_by' => $vendor->id,
            ]);
            $product->addMediaFromUrl("https://picsum.photos/seed/{$product->SKU}/800/600")->toMediaCollection('images');
        }
    }
}
