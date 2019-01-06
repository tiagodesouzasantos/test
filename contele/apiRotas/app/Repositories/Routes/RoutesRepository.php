<?php
namespace App\Repositories\Routes;
use App\Models\Routes;
use Illuminate\Http\Request;

class RoutesRepository{

    public function listAll(){
        $routes = Routes::all(); 
        return response()->json($routes);
    }
    public function show($id){
        $routes = Routes::find($id); 
        return (!$routes)? response()->json(['message'=>'Record not found'],404) : response()->json($routes);
    }
    public function store(Request $request){
        try {
            $routes = new Routes();
            $routes->fill($request->all());
            $routes->save();
            return response()->json($routes, 201);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
        
    }
    public function update(Request $request, $id){
        $routes = Routes::find($id);
        if(!$routes){
            return response()->json(['message'=>'record not found'],404);
        }
        $routes->fill($request->all());
        $routes->save();
        return response()->json($routes);
    }
    public function delete($id){
        $routes = Routes::find($id);
        if(!$routes){
            return response()->json(['message'=>'record not found'],404);
        }
        $routes->delete();
        return response()->json(['message'=>'Registro excluido com sucesso'],200);
    }
}
?>