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
                    // $timeout(function() {
                    // }, 100);
                    return rotasProm.promise;
                },
                getTreinamentosDoDia: function() {
                    var doDiaProm = $q.defer();
                    $timeout(function() {
                        doDiaProm.resolve(treinamentosFake);
                    }, 100);
                    return doDiaProm.promise;
                }
            }
        }
    )