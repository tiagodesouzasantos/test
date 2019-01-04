angular.module('rotasAngularJs')
    .service('api', function(session, $q, $http, appUrls, msgsService) {
        return {
            post: function(url, params) {
                var postProm = $q.defer();
                $http.post(appUrls.getUrl(url), params, this.getHeader())
                    .then(function(postResult) {
                        console.log('postResult', postResult);
                        postProm.resolve(postResult);
                    }).catch(function(postError) {
                        console.log('postError', postError);
                        var postErro = postError.data.error;
                        postProm.reject(msgsService.getMsg(postErro.module, postErro.msg));
                    });
                return postProm.promise;
            },
            show: function(url, params) {
                var getProm = $q.defer();
                console.log(appUrls.getUrl(url) + "/" + params);
                $http.get(appUrls.getUrl(url) + "/" + params)
                    .then(function(getResult) {
                        getProm.resolve(getResult);
                        console.log('getResult', getResult);
                    }).catch(function(getError) {
                        console.log('getError', getError);
                        var getErro = getError.data.error;
                        getProm.reject(msgsService.getMsg(getErro.module, getErro.msg));
                    });
                return getProm.promise;
            },
            get: function(url) {
                var getProm = $q.defer();
                var authData = JSON.parse(session.getData('authData'));
                var url = appUrls.getUrl(url) + '?token=' + authData.token.token;
                var apiS = this;
                $http.get(url).then(function(getResult) {
                    getProm.resolve(getResult.data);
                    console.log('getResult', getResult);
                }).catch(function(getError) {
                    console.log('getError', getError);
                    var errorMsg = apiS.getErrors(getError.status, getError.data);
                    getProm.reject(errorMsg);
                });
                return getProm.promise;
            },
            put: function(url, params, id) {
                var putProm = $q.defer();
                console.log(appUrls.getUrl(url) + "/" + id);
                $http.put(appUrls.getUrl(url) + "/" + id, params)
                    .then(function(putResult) {
                        putProm.resolve(putResult);
                        console.log('putResult', putResult);
                    }).catch(function(putError) {
                        console.log('putError', putError);
                        var putErro = putError.data.error;
                        putProm.reject(msgsService.getMsg(putErro.module, putErro.msg));
                    });
                return putProm.promise;
            },
            getErrors: function(status, data) {
                try {
                    var msg;
                    switch (status) {
                        case 401:
                            msg = msgsService.getMsg('app', 11);
                            break;
                        default:
                            msg = msgsService.getMsg('app', 3);
                    }
                    return msg;
                } catch (error) {
                    console.log('getErrors', error);
                    return msgsService.getMsg('app', 3);
                }
            }
        }
    })