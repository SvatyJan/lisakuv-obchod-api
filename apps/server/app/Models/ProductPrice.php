<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductPrice extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['product_id', 'old_price', 'new_price', 'changed_at'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}