<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Repositories\User\UserRepository;
use JWTAuth;
use JWTAuthException;

class UserController extends Controller{
    private $user;
    public function __construct(User $user){
        $this->user = $user;
    }
   
    public function register(Request $request){
        $user = $this->user->create([
          'name' => $request->get('name'),
          'email' => $request->get('email'),
          'password' => bcrypt($request->get('password'))
        ]);
        return response()->json(['status'=>true,'message'=>'User created successfully','data'=>$user]);
    }
    
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $userRepository = new UserRepository();
        $token = null;
        try {
           $token = JWTAuth::attempt($credentials); 
           if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['invalid_email_or_password'], 422);
           }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
        return response()->json([
            "token"=>compact('token'),
            "user"=>$userRepository->findByEmail($credentials['email'])
        ]);
    }
    public function getAuthUser(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }
    

    // public function index(){
    //     $user = User::all(); 
    //     return response()->json($user);
    // }
    // public function show($id){
    //     $user = User::find($id); 
    //     return (!$user)? response()->json(['message'=>'Record not found'],404) : response()->json($user);
    // }
    // public function store(Request $request){
    //     $user = new User();
    //     $user->fill($request->all());
    //     $user->save();
    //     return response()->json($user,201);
    // }
    // public function update(Request $request, $id){
    //     $user = User::find($id);
    //     if(!$user){
    //         return response()->json(['message'=>'record not found'],404);
    //     }
    //     $user->fill($request->all());
    //     $user->save();
    //     return response()->json($user);
    // }
    // public function delete($id){
    //     $user = User::find($id);
    //     if(!$user){
    //         return response()->json(['message'=>'record not found'],404);
    //     }
    //     $user->delete();
    //     return response()->json(['message'=>'Registro excluido com sucesso'],200);
    // }
}
