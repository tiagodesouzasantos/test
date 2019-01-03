angular.module('timeService')
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
    }])