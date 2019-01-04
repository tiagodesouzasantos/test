angular.module('home')
    .service('homeService',
        function($q, $http, api, session, $timeout) {
            return {
                getListRotas: function() {
                    var rotasProm = $q.defer();
                    api.get('listMaps').then(function(rotasResult) {
                        rotasProm.resolve(rotasResult);
                    }).catch(function(rotasError) {
                        rotasProm.reject(rotasError);
                    });
                    return rotasProm.promise;
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
                }
            }
        }
    )