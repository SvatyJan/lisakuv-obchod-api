<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ProductController
{
    /**
     * Vrací seznam všech produktů.
     *
     * @queryParam name string Volitelný filtr podle názvu. Example: jablko
     * @queryParam min_stock integer Minimální množství na skladě. Example: 10
     * @response 200 scenario="Úspěšný výpis" [{"id":1,"name":"Jablko",...}]
     */
    public function getProducts(Request $request)
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

    /**
     * Vytvoření produktu
     *
     * @bodyParam name string required Název produktu. Example: Lískový oříšek
     * @bodyParam price float required Cena produktu. Example: 12.5
     * @bodyParam stock integer required Počet kusů. Example: 150
     * @response 201 {"name": "Produkt", "price": 12.5, "stock": 300, ...}
     */
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * Vrátí detail jednoho produktu podle jeho ID.
     *
     * @urlParam id integer required ID produktu. Example: 1
     * @response 200 {
     *   "id": 1,
     *   "name": "Jablko",
     *   "price": 10.5,
     *   "stock": 100,
     *   "created_at": "2025-05-16T12:34:56.000000Z",
     *   "updated_at": "2025-05-16T12:34:56.000000Z"
     * }
     * @response 404 {"message": "Product not found"}
     */

    public function showProduct($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    /**
     * Upraví název, cenu nebo množství existujícího produktu. Pokud se změní cena, zaznamená se historie změny.
     *
     * @urlParam id integer required ID produktu k úpravě. Example: 1
     * @bodyParam name string Název produktu. Example: Mrkev
     * @bodyParam price float Cena produktu. Example: 7.5
     * @bodyParam stock integer Počet kusů. Example: 120
     * @response 200 {
     *   "id": 1,
     *   "name": "Mrkev",
     *   "price": 7.5,
     *   "stock": 120,
     *   "created_at": "...",
     *   "updated_at": "..."
     * }
     * @response 404 {"message": "Product not found"}
     */
    public function updateProduct(Request $request, $id)
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

    /**
     * Smaže produkt podle ID.
     *
     * @urlParam id integer required ID produktu k odstranění. Example: 1
     * @response 200 {"message": "Product deleted"}
     * @response 404 {"message": "Product not found"}
     */
    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        $productName = product->name;
        $message = "Product " . $productName . " deleted";
        $product->delete();

        return response()->json(['message' => $message]);
    }

    /**
     * Vrátí seznam všech změn ceny pro zvolený produkt seřazený od nejnovějších.
     *
     * @urlParam id integer required ID produktu. Example: 1
     * @response 200 [
     *   {
     *     "id": 10,
     *     "product_id": 1,
     *     "old_price": 12.5,
     *     "new_price": 10.5,
     *     "changed_at": "2025-05-01T12:00:00.000000Z"
     *   },
     *   ...
     * ]
     * @response 404 {"message": "Product not found"}
     */
    public function priceHistory($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product->priceChanges()->orderBy('changed_at', 'desc')->get());
    }
}