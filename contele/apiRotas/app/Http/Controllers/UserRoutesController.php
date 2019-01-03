<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserRoutes;

class UserRoutesController extends Controller{
    public function index(){
        $userRoutes = UserRoutes::all(); 
        return response()->json($userRoutes);
    }
    public function show($id){
        $userRoutes = UserRoutes::find($id); 
        return (!$userRoutes)? response()->json(['message'=>'Record not found'],404) : response()->json($userRoutes);
    }
    public function store(Request $request){
        $userRoutes = new UserRoutes();
        $userRoutes->fill($request->all());
        $userRoutes->save();
        return response()->json($userRoutes,201);
    }
    public function update(Request $request, $id){
        $userRoutes = UserRoutes::find($id);
        if(!$userRoutes){
            return response()->json(['message'=>'record not found'],404);
        }
        $userRoutes->fill($request->all());
        $userRoutes->save();
        return response()->json($userRoutes);
    }
    public function delete($id){
        $userRoutes = UserRoutes::find($id);
        if(!$userRoutes){
            return response()->json(['message'=>'record not found'],404);
        }
        $userRoutes->delete();
        return response()->json(['message'=>'Registro excluido com sucesso'],200);
    }
}
