<?php

use Illuminate\Database\Seeder;

class RoutesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        DB::table('routes')->insert(['spot_one'=>'A','spot_two'=>'B','distance'=>'10','map_id'=>1]);
        DB::table('routes')->insert(['spot_one'=>'B','spot_two'=>'D','distance'=>'15','map_id'=>1]);
        DB::table('routes')->insert(['spot_one'=>'A','spot_two'=>'C','distance'=>'20','map_id'=>1]);
        DB::table('routes')->insert(['spot_one'=>'C','spot_two'=>'D','distance'=>'30','map_id'=>1]);
        DB::table('routes')->insert(['spot_one'=>'B','spot_two'=>'E','distance'=>'50','map_id'=>1]);
        DB::table('routes')->insert(['spot_one'=>'D','spot_two'=>'E','distance'=>'30','map_id'=>1]);
    }
}
