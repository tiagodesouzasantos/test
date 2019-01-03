<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRouteListTable extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        $this->down();
        Schema::create('route_list', function($table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('user_routes_id')->unsigned();
            $table->integer('routes_id')->unsigned();
        });

        Schema::table('route_list', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('user_routes_id')->references('id')->on('user_routes');
            $table->foreign('routes_id')->references('id')->on('routes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('route_list');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
