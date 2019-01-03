angular.module('rotasAngularJs')
    .service('dateService', [function() {
        return {
            formatDateDB: function(date) {

                var optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
                var resultFinal = date.toLocaleDateString('pt-BR', optionsDate)
                    .replace('BRT', '')
                    .trim().split('/').reverse().join('-')
                return resultFinal;

            },
            formatDateTimeDB: function(date) {

                var optionsDate = { timeZone: 'America/Sao_Paulo', year: 'numeric', month: 'numeric', day: 'numeric' };
                var optionsTime = { timeZone: 'America/Sao_Paulo', hour: 'numeric', minute: 'numeric', second: 'numeric' };

                var dtStr = date.toLocaleDateString('pt-BR', optionsDate)
                    .replace('BRT', '')
                    .trim().split('/').reverse().join('-');


                var timeStr = date.toLocaleTimeString('pt-BR', optionsTime).replace('BRT', '').trim();

                return dtStr + ' ' + timeStr;
            },
            formatDateHeader: function(date) {
                var toGetMonth = new Date(date);
                var month = toGetMonth.toLocaleString("pt-br", { month: "long" });
                var arrayDate = date.split('-');
                return arrayDate[2] + ' de ' + month + ' de ' + arrayDate[0];
            }
        }
    }])