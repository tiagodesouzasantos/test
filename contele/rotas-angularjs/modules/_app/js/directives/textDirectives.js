angular.module('text')
    .directive('reduceDesc', function () {
        return function (scope, elm, attr) {
            console.log(scope, elm, attr);                
        };
    })