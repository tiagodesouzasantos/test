<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        $this->down();
        Schema::create('routes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('spot_one');
            $table->string('spot_two');
            $table->integer('distance');
            $table->integer('map_id')->unsigned();
            $table->timestamps();
        });
        Schema::table('routes', function($table) {
            $table->foreign('map_id')->references('id')->on('list_maps');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('routes');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
