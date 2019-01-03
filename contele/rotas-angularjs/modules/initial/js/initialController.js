angular.module('initial')
    .controller('initialController',
        function($scope, $state, $rootScope, initialService, dialogService) {
            $scope.init = function() {
                console.log('%c Que coisa feia inspecionando o app né! ', 'background: #222; color: #bada55');
            }
            $scope.submit = function() {
                $rootScope.showLoading = true;
                initialService.login($scope.login).then(function(authUsuarioResult) {
                    $rootScope.showLoading = false;
                    $state.go('home');
                }).catch(function(authUsuarioError) {
                    $rootScope.showLoading = false;
                     var confirmeJson = {
                        "title": "Problemas!",
                        "content": authUsuarioError,
                        "buttonOk": "Ok",
                    };
                    dialogService.confirm(confirmeJson);
                });
            }
        });