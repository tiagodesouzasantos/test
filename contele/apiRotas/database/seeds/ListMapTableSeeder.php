<?php

use Illuminate\Database\Seeder;

class ListMapTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        DB::table('list_maps')->insert(['name'=>'SP']);
    }
}
