<?php
namespace App\Repositories\Routes;
use App\Models\ListMaps;

class ListMapsRepository{

    public function listAll(){
        $listMaps = ListMaps::all()->load('routes'); 
        // return response()->json($listMaps);
        return $listMaps;
    }
    public function show($id){
        $listMaps = ListMaps::find($id); 
        return (!$listMaps)? response()->json(['message'=>'Record not found'],404) : response()->json($listMaps);
    }
    public function store(Request $request){
        $listMaps = new ListMaps();
        $listMaps->fill($request->all());
        $listMaps->save();
        return response()->json($listMaps,201);
    }
    public function update(Request $request, $id){
        $listMaps = ListMaps::find($id);
        if(!$listMaps){
            return response()->json(['message'=>'record not found'],404);
        }
        $listMaps->fill($request->all());
        $listMaps->save();
        return response()->json($listMaps);
    }
    public function delete($id){
        $listMaps = ListMaps::find($id);
        if(!$listMaps){
            return response()->json(['message'=>'record not found'],404);
        }
        $listMaps->delete();
        return response()->json(['message'=>'Registro excluido com sucesso'],200);
    }
}
?>