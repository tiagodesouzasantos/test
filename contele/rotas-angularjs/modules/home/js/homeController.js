angular.module('home')
    .controller('homeController',
        function($scope, homeService, dialogService, $rootScope, session, $mdDialog, msgsService) {
            $scope.init = function() {
                $rootScope.showLoading = true;
                $scope.loadData();
            }

            $scope.loadData = function() {
                homeService.getListRotas().then(function(rotasResult) {
                    $rootScope.showLoading = false;
                    $scope.malhasRotas = rotasResult;
                    console.log('rotasResult', rotasResult);
                }).catch(function(rotasError) {
                    console.log('rotasError', rotasError);
                });
            }
        });