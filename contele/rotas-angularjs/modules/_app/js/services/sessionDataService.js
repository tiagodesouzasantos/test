angular.module('rotasAngularJs')
    .service('session', ['msgsService', '$state', 'dialogService',
        function(msgsService, $state, dialogService) {
            return {
                setData: function(nameData, data) {
                    try {
                        sessionStorage.setItem(nameData, btoa(data));
                        return true;
                    } catch (error) {
                        throw error;
                    }
                },
                getData: function(nameData) {
                    try {
                        if (!sessionStorage.getItem(nameData)) {
                            throw msgsService.getMsg('app', '5');
                        }

                        return atob(sessionStorage.getItem(nameData));
                    } catch (error) {
                        throw msgsService.getMsg('app', '5');
                    }
                },
                valideSession: function() {
                    try {
                        if (!sessionStorage.getItem('userData')) {
                            $state.go('initial');
                            dialogService.alert(msgsService.getMsg('app', '5'));
                            return false;
                        }
                        return true;
                    } catch (error) {
                        msgsService.getMsg('app', '5');
                    }
                },
                clear: function() {
                    sessionStorage.clear();
                }
            }
        }
    ])