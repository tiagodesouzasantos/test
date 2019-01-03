<?php

use Illuminate\Database\Seeder;

class UserRoutesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
         DB::table('user_routes')->insert([
            'user_id' => 1,
            'name' => 'Rota Contele Exemplo',
            'spot_one' => 'A',
            'spot_two' => 'D',
            'distance' => 25,
            'autonomy' => 10,
            'fuel_value' => 2.50,
        ]);
    }
}
