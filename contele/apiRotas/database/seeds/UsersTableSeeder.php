<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        DB::table('users')->insert([
            'name' => 'contele',
            'email' => 'contele@gmail.com',
            'password' => Hash::make('senha123'),
        ]);
        DB::table('users')->insert([
            'name' => 'Tiago',
            'email' => 'tiago.souza.santos1989@gmail.com',
            'password' => Hash::make('senha123'),
        ]);
        DB::table('users')->insert([
            'name' => 'João',
            'email' => 'joao_do_caminhao@gmail.com',
            'password' => Hash::make('senha123'),
        ]);
    }
}
