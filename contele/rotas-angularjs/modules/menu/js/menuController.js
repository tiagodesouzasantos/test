angular.module('menu')
    .controller('menuController', function($scope, $mdSidenav, $log, $state, session) {
        $scope.init = function() {
            var authData = JSON.parse(session.getData('authData'));
            $scope.user = authData.user;
        }

        $scope.close = function(menuClose) {
            $mdSidenav(menuClose).close()
                .then(function() {
                    $log.debug("close LEFT is done");
                }).catch(function(evt) {
                    console.log(evt);
                });

        }

        $scope.toogleSideNav = function(menuClose) {
            $mdSidenav(menuClose).toggle();
            setTimeout(function() {
                $scope.$broadcast('reCalcViewDimensions');
            }, 1)
        }

        $scope.goto = function(state) {
            if (state == "exit") {
                sessionStorage.clear()
                $state.go("initial");
            }
            $state.go(state);
            $scope.close('left');
        }

    });