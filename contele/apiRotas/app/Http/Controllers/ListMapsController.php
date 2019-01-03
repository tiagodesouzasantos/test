<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Routes\ListMapsRepository;

class ListMapsController extends Controller{
    public function index(){
        $listMapsRepository = new ListMapsRepository();
        // $listMaps = ListMaps::all(); 
        return response()->json($listMapsRepository->listAll());
        // return ;
    }
    public function show($id){
        $listMapsRepository = new ListMapsRepository();
        // $listMaps = ListMaps::find($id); 
        // return (!$listMaps)? response()->json(['message'=>'Record not found'],404) : response()->json($listMaps);
        return $listMapsRepository->show($id);
    }
    public function store(Request $request){
        $listMapsRepository = new ListMapsRepository();
        // $listMaps = new ListMaps();
        // $listMaps->fill($request->all());
        // $listMaps->save();
        // return response()->json($listMaps,201);
        return $listMapsRepository->store($request);
    }
    public function update(Request $request, $id){
        $listMapsRepository = new ListMapsRepository();
        // $listMaps = ListMaps::find($id);
        // if(!$listMaps){
        //     return response()->json(['message'=>'record not found'],404);
        // }
        // $listMaps->fill($request->all());
        // $listMaps->save();
        // return response()->json($listMaps);
        return $listMapsRepository->update($request, $id);
    }
    public function delete($id){
        $listMapsRepository = new ListMapsRepository();
        // $listMaps = ListMaps::find($id);
        // if(!$listMaps){
        //     return response()->json(['message'=>'record not found'],404);
        // }
        // $listMaps->delete();
        // return response()->json(['message'=>'Registro excluido com sucesso'],200);
        return $listMapsRepository->delete($id);
    }
}
