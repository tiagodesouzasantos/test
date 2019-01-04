angular.module('home')
    .controller('homeController',
        function($scope, homeService, dialogService, $rootScope, session, $mdDialog, msgsService, auth) {
            $scope.init = function() {
                $rootScope.showLoading = true;
                $scope.loadData();
            }

            $scope.loadData = function() {
                homeService.getListRotas().then(function(routesResult) {
                    $rootScope.showLoading = false;
                    $scope.routesMesh = homeService.filterOptions(routesResult);
                    console.log('routesResult', routesResult);
                }).catch(function(rotasError) {
                    console.log('rotasError', rotasError);
                    $rootScope.showLoading = false;
                    var confirmeJson = {
                        "title": "Problemas!",
                        "content": rotasError,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson).then(function(confirm) {
                        auth.logout();
                    });
                });
            }
        });