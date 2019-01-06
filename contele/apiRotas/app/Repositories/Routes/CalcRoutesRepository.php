<?php
namespace App\Repositories\Routes;
use App\Models\ListMaps;
use App\Models\Routes;

class CalcRoutesRepository{

    public function calc($infoRoutes){
        try{
            $spots = array(
                "mapId" => $infoRoutes['routes'][0]['map_id'],
                "spotOne" => $infoRoutes['spotOne'],
                "spotTwo" => $infoRoutes['spotTwo']
            );
            $foundRoutes = $this->foundRoutesSpotToSpot($spots);
            $bestRoute = $this->findBestRoute($foundRoutes, $spots['spotOne'], $spots['spotTwo']);
            return array("foundRoutes"=>$foundRoutes, "bestRoute"=>$bestRoute);
        }catch(\Exception $e){
            Throw new \Exception($e->getMessage());
        }
       
    }
    public function foundRoutesSpotToSpot(Array $spots){
        try {
            return Routes::whereIn('spot_one', [$spots['spotOne'], $spots['spotTwo']])
                ->OrwhereIn('spot_two', [$spots['spotOne'], $spots['spotTwo']])
                ->where('map_id', '=', $spots['mapId'])
                ->get();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
    public function findBestRoute($routes, $spotOne, $spotTwo){
        try {
            $directRoute = $this->directRoute($routes, $spotOne, $spotTwo);
            $pointsRoute = $this->pointsRoute($routes, $spotOne, $spotTwo);
            
            return array("directRoute"=>$directRoute, "pointsRoute"=>$pointsRoute);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
    public function directRoute($routes,$spotOne,$spotTwo){
        try {
            $directRoute = [];
            for($i=0;$i<count($routes);$i++){
                $dr = $routes[$i]['spot_one'] == $spotOne && $routes[$i]['spot_two'] == $spotTwo;
                $ir = $routes[$i]['spot_one'] == $spotTwo && $routes[$i]['spot_two'] == $spotOne;
                if($dr || $ir){
                    $directRoute = $routes[$i];
                }
            }
            return $directRoute;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function pointsRoute($routes, $spotOne, $spotTwo){
        $routesToTwoSpot = [];
        $routesSpotOne = [];
        $routesSpotTwo = [];
        //find spot one
        for ($i = 0; $i < count($routes); $i++) {
            if(!($spotOne == $routes[$i]['spot_one'] && $spotTwo == $routes[$i]['spot_two'])){
                if($spotOne == $routes[$i]['spot_one']){
                    $routes[$i]['listRoutesMap'] = $this->findNextPoint($routes, $i, $spotTwo);
                    array_push($routesSpotOne,$routes[$i]);
                    unset($routes[$i]);
                    $routes = array_values($routes);
                }
            }
            
        }
        return $routesToTwoSpot;
    }

    public function findNextPoint($routes, $startFind, $spotTwo){
        $listRoutesMap = [];
        for ($i = $startFind; $i < count($routes); $i++) {
            if($i == $startFind){
                $next = $routes[$i]['spot_two'];
            }else{
                if($routes[$i]['spot_one']==$next){
                    $next = $routes[$i]['spot_two'];
                    array_push($listRoutesMap, $routes[$i]);
                    unset($routes[$i]);
                    array_values($routes);
                }
            }
        }
        return $listRoutesMap;
    }

}
?>