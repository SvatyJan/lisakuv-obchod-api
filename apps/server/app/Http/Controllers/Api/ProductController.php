<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('name')) {
            $query->where('name', 'ilike', '%' . $request->input('name') . '%');
        }

        if ($request->has('min_stock')) {
            $query->where('stock', '>=', (int) $request->input('min_stock'));
        }

        if ($request->has('max_stock')) {
            $query->where('stock', '<=', (int) $request->input('max_stock'));
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
        ]);

        if (isset($validated['price']) && $validated['price'] != $product->price) {
            ProductPrice::create([
                'product_id' => $product->id,
                'old_price' => $product->price,
                'new_price' => $validated['price'],
                'changed_at' => Carbon::now(),
            ]);
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }

    public function priceHistory($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product->priceChanges()->orderBy('changed_at', 'desc')->get());
    }
}