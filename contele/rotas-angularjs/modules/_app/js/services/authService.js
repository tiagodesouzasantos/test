angular.module('rotasAngularJs')
    .service('auth', function(session, $q, $http, $state, appUrls,msgsService) {
        return {
            login: function(user) {
                var authProm = $q.defer();
                // var usuario = { "email": "tiago.santos@bandeiranteslog.com.br", "senha": "123" };
                $http.post(appUrls.getUrl('appAuth'), user)
                    .then(function(authResult) {
                        authProm.resolve(authResult.data);
                        console.log(authResult.data);
                        session.setData('authData', JSON.stringify(authResult.data));
                    }).catch(function(authError) {
                        if(authError.data[0]=='invalid_email_or_password'){
                            authError = msgsService.getMsg('usuario',1);
                        }
                        authProm.reject(authError);
                    });
                return authProm.promise;
            },
            logout: function() {
                session.clear();
                $state.go('initial');
            }
        }
    })