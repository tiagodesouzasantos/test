angular.module('rotasAngularJs')
    .filter('dtBrFormat', [function() {
        return function(data) {
            // Para funcionar com: STRING && ( DB DATE FORMAT || DB DATE TIME FORMAT )
            if (data != undefined && data.length <= 10) {
                return data.split('-').reverse().join('/')
            } else if (data != undefined && data.length > 10) {
                var dtToReturn = '';
                var dtSplit = data.split(' ');

                dtToReturn = dtSplit[0].split('-').reverse().join('/')
                dtToReturn += ' ' + dtSplit[1];
                return dtToReturn;
            }

        };
    }])