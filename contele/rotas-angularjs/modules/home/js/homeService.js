angular.module('home')
    .service('homeService',
        function($q, $http, api, session, $timeout) {
            return {
                getListRoutes: function() {
                    var routesProm = $q.defer();
                    api.get('listMaps').then(function(routesResult) {
                        routesProm.resolve(routesResult);
                    }).catch(function(routesError) {
                        routesProm.reject(routesError);
                    });
                    return routesProm.promise;
                },
                filterOptions: function(routesMash) {
                    for (var i = 0; i < routesMash.length; i++) {
                        var spots = [];
                        routesMash[i].routes.forEach(function(value, key) {
                            spots.push(value.spot_one);
                            spots.push(value.spot_two);
                        });
                        routesMash[i].spots = spots.filter((v, i, a) => a.indexOf(v) === i)
                    }
                    return routesMash;
                },
                apiCalcRoutes: function(routeToCalc) {
                    var calcRouteProm = $q.defer();
                    console.log('routeToCalc', routeToCalc);
                    api.post("calcRoutes", routeToCalc).then(function(calcResult) {
                        console.log('calcResult', calcResult);
                        calcRouteProm.resolve(calcResult);
                    }).catch(function(calcError) {
                        calcRouteProm.reject(calcError);
                        console.log('calcError', calcError);
                    });
                    return calcRouteProm.promise;
                },
                saveNewRoute: function(newRoute) {
                    var newRouteProm = $q.defer();
                    api.post("listMaps", newRoute).then(function(newRouteResult) {
                        console.log('newRouteResult', newRouteResult);
                        newRouteProm.resolve(newRouteResult);
                    }).catch(function(newRouteError) {
                        newRouteProm.reject(newRouteError);
                        console.log('newRouteError', newRouteError);
                    });
                    return newRouteProm.promise;
                },
                saveNewSpot: function(newSpot) {
                    var newSpotProm = $q.defer();
                    api.post("routes", newSpot).then(function(newSpotResult) {
                        console.log('newSpotResult', newSpotResult);
                        newSpotProm.resolve(newSpotResult);
                    }).catch(function(newSpotError) {
                        newSpotProm.reject(newSpotError);
                        console.log('newSpotError', newSpotError);
                    });
                    return newSpotProm.promise;
                }
            }
        }
    )