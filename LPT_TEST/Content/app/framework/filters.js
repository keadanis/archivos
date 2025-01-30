angular.module('framework.filters', [])
    .filter('localtime', function () {
        return function (d) {
            return (angular.isUndefined(d) || d === null) ? '' :  d.toString().replace(
                /^(?:\d\d\d\d-\d\d-\d\dT)?\d\d:\d\d(?::\d\d(?:\.\d+)?)?$/,
                function ($0) {
                    var offset = (new Date).getTimezoneOffset(),
                        hours = Math.floor(Math.abs(offset) / 60),
                        minutes = Math.abs(offset) % 60,
                        sign = offset <= 0 ? '+' : '-',
                        tz = (sign + (hours * 100 + minutes))
                            .replace(/^([-+])(\d\d\d)$/, '$10$2');

                    return $0 + tz;
                });
        }
    })
    .filter('slice', function() {
        /**
         * Filtra un maximo de items en la lista
         * @param  {Array} arr   Arreglo a filtrar
         * @param  {integer} start Indice de inicio a filtrar
         * @param  {integer} end   Indice final a filtrar
         * @return {Function} Retorna la funcion que permite filtrar
         */
        function sliceFilter (arr, start, end) {
            return (arr || []).slice(start, end);
        }
        return sliceFilter;
    })
    ;