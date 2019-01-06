<?php

namespace App\Http\Controllers\Routes;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Routes\RoutesRepository;

class RoutesController extends Controller{
    public function index(){
        $routesRepository = new RoutesRepository();
        return $routesRepository->listAll();
    }
    public function show($id){
        $routesRepository = new RoutesRepository();
        return $routesRepository->show($id);
    }
    public function store(Request $request){
        $routesRepository = new RoutesRepository();        
        return $routesRepository->store($request);
        // return response()->json([1,2,3], 201);
    }
    public function update(Request $request, $id){
        $routesRepository = new RoutesRepository();
        return $routesRepository->update($request,$id);
    }
    public function delete($id){
        $routesRepository = new RoutesRepository();
        return $routesRepository->delete($id);
    }
}
