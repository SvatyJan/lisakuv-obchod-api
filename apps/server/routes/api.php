<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('products')
->controller(ProductController::class)
->group(function ()
    {
        Route::get('/', 'getProducts');
        Route::get('/{id}', 'showProduct');
        Route::post('/', 'storeProduct');
        Route::put('/{id}', 'updateProduct');
        Route::delete('/{id}', 'deleteProduct');
    }
);
