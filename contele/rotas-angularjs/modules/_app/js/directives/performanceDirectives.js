angular.module('performance')
    .directive('whenScrolledAll', [function() {
        return function(scope, elm, attr) {
            var raw = elm[0];
            elm.bind('scroll', function() {
                // if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.whenScrolledAll);
                }
            });
        };
    }])