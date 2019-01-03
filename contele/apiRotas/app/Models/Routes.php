<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Routes extends Model{
    protected $fillable = ['spot_one','spot_two','distance','map_id'];
    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'routes';
}
