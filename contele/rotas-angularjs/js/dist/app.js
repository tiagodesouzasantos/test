angular.module('rotasAngularJs', [
    'ngMaterial',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'gridster',
    'ui.carousel',
    'chart.js',
    'home',
    'menu',
    'initial',
    'rzModule',
    'dbServer',
    'mapsService',
    'timeService',
    'materialCalendar',
    'treinamento',
    'text'
])

.config(["$mdThemingProvider", "$stateProvider", "$urlRouterProvider", "$mdDateLocaleProvider", function($mdThemingProvider, $stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {



    // Configuração de tema do Angular Material
    $mdThemingProvider
        .theme('default')
        .primaryPalette('light-blue')
        .accentPalette('light-blue');

    // Configuração de rotas
    $stateProvider
        .state('initial', {
            url: '/initial',
            views: {
                'content@': {
                    templateUrl: 'modules/initial/index.html',
                    controller: 'initialController'
                }
            }
        })

    .state('menu', {
        abstract: true,
        views: {
            'content@': {
                templateUrl: 'modules/menu/index.html',
                controller: 'menuController as menu'
            }
        }
    })

    // INICIO PUBLICACOES
    .state('home', {
            parent: 'menu',
            url: '/home',
            views: {
                'main@menu': {
                    templateUrl: 'modules/home/index.html',
                    controller: 'homeController as home'
                }
            }
        })
        .state('treinamento', {
            parent: 'menu',
            url: '/treinamento',
            params: { treinamento: null },
            views: {
                'main@menu': {
                    templateUrl: 'modules/treinamento/index.html',
                    controller: 'treinamentoController as treinamento'
                }
            }
        })


    $urlRouterProvider.otherwise('initial');
    //Formato Brazileiro date
    $mdDateLocaleProvider.formatDate = function(dateString) {
        var data;
        if (dateString === undefined) {
            data = '';
        } else {
            data = moment(dateString).format('DD/MM/YYYY');
        }
        return data;
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    //Tradução Calendar
    $mdDateLocaleProvider.months = ['janeiro', 'fereveiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];


}]).run(["$rootScope", "$state", "session", function($rootScope, $state, session) {

    var routerWithLogin = ['home', 'menu', 'treinamento'];

    $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
        for (var route in routerWithLogin) {
            if (next.indexOf(routerWithLogin[route]) > -1) {
                // session.valideSession();
                break;
            }
        }
    })
}]);;angular.module('dbServer', [])
angular.module('mapsService', [])
angular.module('sessionService', [])
angular.module('timeService', [])

angular.module('menu', [])
angular.module('text', [])

angular.module('initial', [])
angular.module('treinamento', [])
angular.module('home', ['ksSwiper', 'dbServer']);angular.module('initial')
    .controller('initialController',
        ["$scope", "$state", "$rootScope", "initialService", "dialogService", function($scope, $state, $rootScope, initialService, dialogService) {
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
        }]);;angular.module('home')
    .controller('homeController',
        ["$scope", "homeService", "dialogService", "$rootScope", "session", "$mdDialog", "msgsService", "auth", function($scope, homeService, dialogService, $rootScope, session, $mdDialog, msgsService, auth) {
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
        }]);;angular.module('menu')
    .controller('menuController',["$scope", "$mdSidenav", "$log", "$state", "$rootScope", "homeService", "session", function($scope, $mdSidenav, $log, $state, $rootScope, homeService, session) {
            // GET LOCATION OF USER
            $scope.init = function() {
                var authData = JSON.parse(session.getData('authData')); 
                console.log(authData);
                $scope.user = authData.user;//listaColaboradores[0];
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

        }]
    );;angular.module('home')
    .service('homeService',
        ["$q", "$http", "api", "session", "$timeout", function($q, $http, api, session, $timeout) {
            return {
                getListRotas: function() {
                    var rotasProm = $q.defer();
                    api.get('listMaps').then(function(rotasResult) {
                        rotasProm.resolve(rotasResult);
                    }).catch(function(rotasError) {
                        rotasProm.reject(rotasError);
                    });
                    return rotasProm.promise;
                },
                filterOptions: function(routesMash) {
                    for (var i = 0; i < routesMash.length; i++) {
                        var spots = [];
                        routesMash[i].routes.forEach(function(value, key) {
                            spots.push(value.spot_one);
                            spots.push(value.spot_two);
                        });
                        routesMash[i].spots = spots.filter((v, i, a) => a.indexOf(v) === i)
                    }
                    return routesMash;
                }
            }
        }]
    );angular.module('initial')
    .service('initialService',
        ["$q", "$http", "db", "msgsService", "auth", function($q, $http, db, msgsService, auth) {
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
        }]
    );angular.module('dbServer')
    .service('db', ['$q', '$http', 'appUrls', 'errorRequestService',
        function($q, $http, appUrls, errorRequestService) {
            return {
                dbActions: function(boName, param, con, timeoutSelected) {
                    var data = {
                        'acao': boName,
                        'param': param,
                        'conexao': con
                    };
                    var timeoutToRequest = 30000;

                    if (timeoutSelected != undefined || timeoutSelected != null) {
                        timeoutToRequest = timeoutSelected;
                    }
                    var requestConfig = {
                        url: appUrls.getUrl("appServicesV1DbServices"),
                        data: data,
                        method: 'post',
                        timeout: timeoutToRequest
                    }

                    var prom = $q.defer();

                    $http(requestConfig).then(function(response) {
                        responseData = response.data;
                        if (responseData != undefined) {
                            if (responseData.length < 1) {
                                prom.reject("sem dados");
                            } else {
                                prom.resolve(responseData);
                            }
                        } else {
                            prom.reject("sem dados");
                        }
                    }, function(response) {
                        console.log('db-error', response);
                        prom.reject(errorRequestService.getMsg(response.status));
                    });
                    return prom.promise;
                }
            }
        }
    ]);angular.module('rotasAngularJs')
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
    }]);angular.module('rotasAngularJs')
    .service('dialogService', ['$mdDialog', '$rootScope', '$q',
        function($mdDialog, $rootScope, $q) {
            // msgsService
            return {
                alert: function(msg) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        // .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Mensagem')
                        .textContent(msg)
                        // .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        // .targetEvent(alert('asdasd'))
                    );
                },
                confirm: function(confirmeJson) {
                    // var confirmeJson = {
                    //     "title": "Algo aconteceu!",
                    //     "content": validacaoErro.msgRetorno,
                    //     "buttonOk": "Ok",
                    // 	   "buttonCancel":"Cancel"
                    // };				
                    var confirmProm = $q.defer();
                    var confirm;

                    if (confirmeJson.buttonCancel != undefined) {
                        confirm = $mdDialog.confirm();
                        confirm.cancel(confirmeJson.buttonCancel);
                    } else {
                        confirm = $mdDialog.alert();
                    }

                    confirm.title(confirmeJson.title)
                        .textContent(confirmeJson.content)
                        .ariaLabel(confirmeJson.label)
                        .ok(confirmeJson.buttonOk);

                    $mdDialog.show(confirm).then(function() {
                        confirmProm.resolve(true);
                    }, function() {
                        confirmProm.reject(false);
                    });

                    return confirmProm.promise;
                },
                loading: function(paramLoading) {

                    if (paramLoading == 'hide') {
                        $mdDialog.hide();
                        return;
                    }

                    // var msg = msgsService.getMsg('app', '4');

                    $mdDialog.show({
                        template: '<div id="loading">' +
                            '<div class="contain-animation">' +
                            '<div class="contain-bear">' +
                            '<img class="prints" src="img/loading/pawprints.svg" alt="Bear Prints" />' +
                            '<span class="cover"></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>',
                        parent: angular.element(document.body),
                        clickOutsideToClose: false,
                        fullscreen: false,
                        escapeToClose: false
                    });


                },
                openNewWindow: function(url) {
                    window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes')
                }
            }
        }
    ]);angular.module('rotasAngularJs')
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
    ]);angular.module('rotasAngularJs')
    .service('msgsService', [function() {
        return {
            getIdioma: function() {
                var idioma = sessionStorage.getItem('idioma');
                if (idioma == undefined || idioma == null) {
                    idioma = "portugues";
                }
                return idioma;
            },
            getMsg: function(modulo, idMsg) {
                var idioma = this.getIdioma();
                var msgs = {
                    "portugues": {
                        "usuario": {
                            "1": "Usuário ou senha incorretos, por favor tente novamente!",
                            "2": "Usuário já cadastrado!",
                            "3": "Usuário removido!"
                        },
                        "app": {
                            "1": "Dados salvos com sucesso!",
                            "2": "Problemas de conexão com a internet. Por favor, tente novamente mais tarde!",
                            "3": "Ocorreu um erro inesperado. Por favor, tente novamente ou contate nosso suporte!",
                            "4": "Por favor, aguarde...",
                            "5": "Dados de sessão corrompidos. Por favor, faça o login novamente!",
                            "6": "Preencha todos os campos corretamente!",
                            "7": "Tipo de arquivo inválido!",
                            "8": "Não foram encontrados dados para os filtros selecionados!",
                            "10": "Nenhum dado encontrado!",
                            "11": "Sua sessão expirou, por favor faça o login novamente!"
                        }
                    },
                    "ingles": {
                        "usuario": {
                            "1": "Incorrect CPF or password, please try again!"
                        },
                        "app": {
                            "1": "Data saved successfully!",
                            "2": "Problems connecting to the internet. Please try again later!",
                            "3": "An unexpected error has occurred. Please try again or contact our support!",
                            "4": "Please wait...",
                            "5": "Session data corrupted. Please, login again!",
                            "6": "Complete all the fields correctly!",
                            "7": "Invalid file type!",
                            "8": "No data was found for the selected filters!",
                            "10": "No data found, please try again later!"
                        }
                    },
                    "espanhol": {
                        "usuario": {
                            "1": "CPF o contraseña incorrecta, por favor inténtelo de nuevo!"
                        },
                        "app": {
                            "1": "Datos guardados con éxito!",
                            "2": "Problemas de conexión a Internet. Por favor, inténtelo de nuevo más tarde!",
                            "3": "Se ha producido un error inesperado. Por favor, inténtelo de nuevo o contacte nuestro soporte!",
                            "4": "Por favor, espere ...",
                            "5": "Datos de sesión dañados. Por favor, inicie sesión de nuevo!",
                            "6": "Rellena todos los campos correctamente!",
                            "7": "Tipo de archivo no válido!",
                            "8": "No se han asignado datos a los filtros seleccionados!",
                            "10": "Ningún dato encontrado, vuelva a intentarlo más tarde!"
                        }
                    }
                };
                return msgs[idioma][modulo][idMsg];
            }
        }
    }]);angular.module('mapsService')
    .service('maps', ['$q',
        function($q) {
            return {
                getCurrentLocation: function() {
                    var locationProm = $q.defer();
                    var location = {};
                    if (!navigator.geolocation) {
                        location.error = 'Navegador não suporta localização!';
                        locationProm.reject(location);
                    }

                    navigator.geolocation.getCurrentPosition(function(position) {
                        location.lat = position.coords.latitude;
                        location.lng = position.coords.longitude;
                        locationProm.resolve(location);
                    }, function(error) {
                        location.error = 'Problemas na hora de pegar localização!';
                        locationProm.reject(location);
                    });

                    return locationProm.promise;
                }
            }
        }
    ]);angular.module('rotasAngularJs')
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
    ]);angular.module('timeService')
    .service('time', [function () {
        return {
            StringToNumber: function (timeString) {
                var horas = timeString.split(':');
                var segundos = (horas[2] == undefined) ? null : horas[2] * 1;
                return { "horas": horas[0] * 1, "minutos": horas[1] * 1, "segundos": segundos };
            },
            numberToString: function (timeObject) {
                timeObject.horas = timeObject.horas * 1;
                var horas = "" + timeObject.horas;
                horas = horas.length == 1 ? "0" + horas : horas;

                timeObject.minutos = timeObject.minutos * 1;
                var minutos = "" + timeObject.minutos;
                minutos = minutos.length == 1 ? "0" + minutos : minutos;

                var segundos = (timeObject.segundos == undefined || timeObject.segundos == null) ? "" : timeObject.segundos;
                segundos = "" + (segundos.length < 1 ? "" : segundos * 1);
                segundos = segundos.length == 1 ? "0" + segundos : segundos;
                segundos = segundos.length > 1 ? ":" + segundos : "";

                return horas + ":" + minutos + segundos;
            },
            formatCalcDatesResult: function (resultCalc) {
                var secondsFromCalc = parseInt((resultCalc * 60) * 60, 10);
                var hours = Math.floor(secondsFromCalc / 3600);
                var minutes = Math.floor((secondsFromCalc - (hours * 3600)) / 60);
                var seconds = secondsFromCalc - (hours * 3600) - (minutes * 60);
                // hours = hours < 10 ? "0" + hours : hours;
                // minutes = minutes < 10 ? "0" + minutes : minutes;
                // seconds = seconds < 10 ? "0" + seconds : seconds;
                if (hours < 10) { hours = "0" + hours; }
                if (minutes < 10) { minutes = "0" + minutes; }
                if (seconds < 10) { seconds = "0" + seconds; }

                return hours + ':' + minutes + ':' + seconds;
            },
            newDateToIe: function (date) {
                // hack necessário para corrigir falha no internet explorer em interpretação de datas

                var date = date.split('-');
                var dates = date[2].split(' ');
                var hours = dates[1].split(':');

                date[0] = Math.floor(("" + date[0]).replace(/[^0-9]/gi, ""));
                date[1] = Math.floor(("" + date[1]).replace(/[^0-9]/gi, "")) - 1;
                dates[0] = Math.floor(("" + dates[0]).replace(/[^0-9]/gi, ""));
                hours[0] = Math.floor(("" + hours[0]).replace(/[^0-9]/gi, ""));
                hours[1] = Math.floor(("" + hours[1]).replace(/[^0-9]/gi, ""));
                var arrayDate = [date[0], date[1], dates[0], hours[0], hours[1], 0];
                return arrayDate;
            }
        }
    }]);angular.module('rotasAngularJs')
    .service('auth', ["session", "$q", "$http", "$state", "appUrls", "msgsService", function(session, $q, $http, $state, appUrls, msgsService) {
        return {
            login: function(user) {
                var authProm = $q.defer();
                $http.post(appUrls.getUrl('appAuth'), user)
                    .then(function(authResult) {
                        authProm.resolve(authResult.data);
                        console.log(authResult.data);
                        session.setData('authData', JSON.stringify(authResult.data));
                    }).catch(function(authError) {
                        if (authError.data[0] == 'invalid_email_or_password') {
                            authError = msgsService.getMsg('usuario', 1);
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
    }])