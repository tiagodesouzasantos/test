angular.module('rotasAngularJs')
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
    ])