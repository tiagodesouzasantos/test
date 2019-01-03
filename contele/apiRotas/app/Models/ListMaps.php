<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListMaps extends Model{
    protected $fillable = ['name'];
    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'list_maps';
    public function routes(){
        return $this->hasMany('App\Models\Routes','map_id');
    }
}
