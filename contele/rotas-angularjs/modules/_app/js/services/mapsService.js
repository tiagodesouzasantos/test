angular.module('mapsService')
    .service('maps', ['$q',
        function($q) {
            return {
                getCurrentLocation: function() {
                    var locationProm = $q.defer();
                    var location = {};
                    if (!navigator.geolocation) {
                        location.error = 'Navegador não suporta localização!';
                        locationProm.reject(location);
                    }

                    navigator.geolocation.getCurrentPosition(function(position) {
                        location.lat = position.coords.latitude;
                        location.lng = position.coords.longitude;
                        locationProm.resolve(location);
                    }, function(error) {
                        location.error = 'Problemas na hora de pegar localização!';
                        locationProm.reject(location);
                    });

                    return locationProm.promise;
                }
            }
        }
    ])