<?php
namespace App\Repositories\Routes;
use App\Models\ListMaps;
use App\Models\Routes;

class CalcRoutesRepository{

    public function calc($infoRoutes){
        try{
            $spots = array(
                "mapId" => $infoRoutes['routes'][0]['map_id'],
                "spotOne" => $infoRoutes['calcRoute']['spotOne'],
                "spotTwo" => $infoRoutes['calcRoute']['spotTwo'],
                "autonomy" => $infoRoutes['calcRoute']['autonomy'],
                "fuelValues" => $infoRoutes['calcRoute']['fuelValues']
            );
            $foundRoutes = $this->foundRoutesSpotToSpot($spots);
            $bestRoute = $this->findBestRoute($foundRoutes, $spots);
            return array("foundRoutes"=>$foundRoutes, "bestRoute"=>$bestRoute);
        }catch(\Exception $e){
            Throw new \Exception($e->getMessage());
        }
       
    }
    public function foundRoutesSpotToSpot(Array $spots){
        try {
            return Routes::where('map_id', '=', $spots['mapId'])->get();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
    public function findBestRoute($routes, $spots){
        try {
            $directRoute = $this->directRoute($routes, $spots['spotOne'], $spots['spotTwo']);
            $pointsRoute = $this->pointsRoute($routes, $spots['spotOne'], $spots['spotTwo']);
            $listRoutes = array_merge($directRoute, $pointsRoute);
            for($i=0;$i<count($listRoutes);$i++){

            }
            return array("listRoutes"=> $listRoutes);
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
        $mapedRoute = [];
        $routesToTwoSpot = [];
        for ($i = 0; $i < count($routes); $i++) {
            if(!($spotOne == $routes[$i]['spot_one'] && $spotTwo == $routes[$i]['spot_two'])){
                if($spotOne == $routes[$i]['spot_one']){
                    $routes[$i]['routes']=[];
                    $listRoute = array(
                        "spot_one" => $routes[$i]['spot_one'],
                        "spot_two" => $routes[$i]['spot_two'],
                        "distance" => $routes[$i]['distance']
                    );
                    $listRoute["list_routes"] = [$listRoute];
                    array_push($routesToTwoSpot, $listRoute);
                    array_push($mapedRoute,$i);
                }
            }
        }
        $last = [];
        for($i=0;$i<count($routesToTwoSpot);$i++){
            $last = $routesToTwoSpot[$i]['spot_two'];
            for($x=0;$x<count($routes);$x++){
                if($last == $routes[$x]['spot_one']){
                    if(!in_array($x, $mapedRoute)){
                        $last = $routes[$x]['spot_two'];
                        array_push($routesToTwoSpot[$i]['list_routes'], array(
                            "spot_one" => $routes[$x]['spot_one'],
                            "spot_two" => $routes[$x]['spot_two'],
                            "distance" => $routes[$x]['distance'],
                        ));
                    }
                    if($spotTwo == $routes[$x]['spot_two']){
                        break;
                    }
                }
            }
        }
        
        return $routesToTwoSpot;
    }

    public function calcValueRoute($autonomy,$kmRoute,$fuelValue){
        return (($kmRoute * 1) / $autonomy)*$fuelValue
    }

}
?>