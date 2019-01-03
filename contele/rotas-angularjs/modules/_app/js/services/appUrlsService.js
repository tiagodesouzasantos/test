angular.module('rotasAngularJs')
    .service('appUrls', [function() {
        return {
            getEnv: function() {
                var environments = {
                    "localhost": "dev"
                };
                var httpHost = window.location.hostname;
                var firstNameHost = httpHost.split('.');
                return environments[firstNameHost[0]];
            },
            getUrl: function(url) {
                var urlMaps = {
                    "dev": {
                        "appAuth": "http://localhost/apiRoutes/auth/login",
                        "listMaps": "http://localhost/apiRoutes/listMaps",
                    }
                };
                return urlMaps[this.getEnv()][url];
            }
        }
    }])