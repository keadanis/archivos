Application.Services
    .factory('RutasResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context +'/api/RutasApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('RutasKey', [['id', 'id']])
    .constant('RutasFilters', [['EQUAL','id'], ['EQUAL','circuito'], ['EQUAL','direccion'], ['EQUAL','regional'], ['EQUAL','destino'], ['EQUAL','tipo']])
    .service('RutasParams', function ($http) {
        this.itemNameEdit = 'itemRutasEdit';
        this.itemName = 'itemRutas';
        this.routeBase = 'rutas';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
        this.data = {};

    });
