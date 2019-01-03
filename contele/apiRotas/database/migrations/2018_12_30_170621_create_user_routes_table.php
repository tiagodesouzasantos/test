<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        $this->down();
        Schema::create('user_routes', function($table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('spot_one');
            $table->string('spot_two');
            $table->integer('distance');
            $table->integer('autonomy');
            $table->decimal('fuel_value', 8, 2);
            $table->timestamps();
        });

        Schema::table('user_routes', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('user_routes');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');        
    }
}
