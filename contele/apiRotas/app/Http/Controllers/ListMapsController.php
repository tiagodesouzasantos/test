<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Routes\ListMapsRepository;

class ListMapsController extends Controller{
    public function index(){
        $listMapsRepository = new ListMapsRepository();
        return response()->json($listMapsRepository->listAll());
    }
    public function show($id){
        $listMapsRepository = new ListMapsRepository();
        return $listMapsRepository->show($id);
    }
    public function store(Request $request){
        $listMapsRepository = new ListMapsRepository();
        return $listMapsRepository->store($request);
    }
    public function update(Request $request, $id){
        $listMapsRepository = new ListMapsRepository();

        return $listMapsRepository->update($request, $id);
    }
    public function delete($id){
        $listMapsRepository = new ListMapsRepository();
        return $listMapsRepository->delete($id);
    }
}
