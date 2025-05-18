<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductPrice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductPricesSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            ProductPrice::insert([
                [
                    'product_id' => $product->id,
                    'old_price' => $product->price + 2,
                    'new_price' => $product->price,
                    'changed_at' => now()->subDays(7),
                ],
                [
                    'product_id' => $product->id,
                    'old_price' => $product->price + 4,
                    'new_price' => $product->price + 2,
                    'changed_at' => now()->subDays(14),
                ],
            ]);
        }
    }
}