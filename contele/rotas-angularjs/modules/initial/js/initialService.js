angular.module('initial')
    .service('initialService',
        function($q, $http, db, msgsService, auth) {
            return {
                validaUsuario: function(usuario) {
                    var validaUsuarioProm = $q.defer();
                    if (usuario != null || usuario != undefined) {
                        validaUsuarioProm.resolve(usuario);

                    } else {
                        var confirmeJson = {
                            "title": "Problemas!",
                            "content": msgsService.getMsg('usuario', 1),
                            "buttonOk": "Ok"
                        };
                        validaUsuarioProm.reject(confirmeJson);
                    }
                    return validaUsuarioProm.promise;
                },
                login: function(usuario) {
                    var authProm = $q.defer();
                    auth.login(usuario).then(function(authResult) {
                        authProm.resolve(authResult);
                    }).catch(function(authError) {
                        authProm.reject(authError);
                    });
                    return authProm.promise;
                }
            }
        }
    )