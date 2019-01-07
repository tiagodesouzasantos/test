angular.module('home')
    .controller('homeController',
        function($scope, homeService, dialogService, $rootScope, $mdDialog, auth) {

            $scope.init = function() {
                $scope.calcRoute = {};
                $scope.newRoute = "";
                $scope.routeToNewSpot = {};
                $scope.route = {};
                $scope.loadDataScreen();
            }

            $scope.loadDataScreen = function() {
                $rootScope.showLoading = true;
                homeService.getListRoutes().then(function(routesResult) {
                    $rootScope.showLoading = false;
                    $scope.routesMesh = homeService.filterOptions(routesResult);
                }).catch(function(routesError) {
                    $rootScope.showLoading = false;
                });
            }
            $scope.sendRoute = function(routeMesh) {
                $rootScope.showLoading = true;
                // $scope.calcRoute.routes = routeMesh.routes;
                console.log('$scope.calcRoute', routeMesh);

                homeService.apiCalcRoutes(routeMesh)
                    .then(function(calcResult) {
                        $rootScope.showLoading = false;
                        console.log(calcResult);
                    }).catch(function(calcError) {
                        $rootScope.showLoading = false;
                        console.log(calcError);
                    });
            }
            $scope.newRouteDialog = function() {
                return $mdDialog.show({
                    controller: function(copyScope) {
                        return copyScope;
                    },
                    controllerAs: 'home',
                    locals: {
                        copyScope: $scope
                    },
                    templateUrl: 'modules/home/new-route.html',
                    clickOutsideToClose: true
                });
            }
            $scope.newSpotDialog = function(route) {
                $scope.routeToNewSpot = route;
                return $mdDialog.show({
                    controller: function(copyScope) {
                        return copyScope;
                    },
                    controllerAs: 'home',
                    locals: {
                        copyScope: $scope
                    },
                    templateUrl: 'modules/home/new-spot.html',
                    clickOutsideToClose: true
                });
            }
            $scope.closeModal = function() {
                $mdDialog.hide();
            }
            $scope.saveNewRoute = function() {
                console.log('$scope.newRoute', $scope.newRoute);
                $rootScope.showLoading = true;
                homeService.saveNewRoute({ "name": $scope.newRoute })
                    .then(function(newRouteResult) {
                        $rootScope.showLoading = false;
                        $scope.closeModal();
                        $scope.init();
                    }).catch(function(newRouteError) {
                        $rootScope.showLoading = false;
                        console.log(newRouteError);
                    });
            }
            $scope.saveNewSpot = function() {
                $scope.route.map_id = $scope.routeToNewSpot.id;
                console.log('$scope.newRoute', $scope.route);
                homeService.saveNewSpot($scope.route)
                    .then(function(newRouteResult) {
                        $rootScope.showLoading = false;
                        $scope.closeModal();
                        $scope.init();
                    }).catch(function(newRouteError) {
                        $rootScope.showLoading = false;
                        console.log(newRouteError);
                    });
            }
        });