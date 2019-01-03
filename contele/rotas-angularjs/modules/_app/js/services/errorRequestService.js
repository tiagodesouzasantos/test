angular.module('rotasAngularJs')
    .service('errorRequestService', ['msgsService',
        function(msgsService) {
            return {
                getMsg: function(status) {
                    switch (status) {
                        case 408:
                            return msgsService.getMsg('app', '2');
                        default:
                            return msgsService.getMsg('app', '3');
                    }
                }
            }
        }
    ])