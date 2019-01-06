<?php

namespace App\Http\Controllers\Routes;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Routes\CalcRoutesRepository;
use App\Repositories\Routes\ListMapsRepository;


class CalcRoutesController extends Controller{
    public function calcRoutes(Request $request){
        try{
            $calcRoutesRepository = new CalcRoutesRepository();
            $resultCalc = $calcRoutesRepository->calc($request->all());
            return response()->json([
                "data" => $resultCalc
            ]);
        }catch(Exception $e){
            return response()->json(array("message"=>$e->getMessage()), 500);
        }
    }
}
