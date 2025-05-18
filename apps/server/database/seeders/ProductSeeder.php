<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::insert([
            [
                'name' => 'Jablko',
                'price' => 10.5,
                'stock' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lískový oříšek',
                'price' => 5.0,
                'stock' => 200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mrkev',
                'price' => 7.5,
                'stock' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}