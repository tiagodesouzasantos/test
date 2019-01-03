<?php
namespace App\Repositories\User;
use App\User;
use Hash;

class UserRepository{

    public function findByEmail($email){
        return User::where('email', $email)->first();
    }
}
?>