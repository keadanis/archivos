Application.Services
    .factory('VehiculosResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context +'/api/VehiculosApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('VehiculosKey', [['id', 'id']])
    .constant('VehiculosFilters', [['EQUAL','id'], ['EQUAL','descripcion'], ['EQUAL','capacidad']])
    .service('VehiculosParams', function ($http) {
        this.itemNameEdit = 'itemVehiculosEdit';
        this.itemName = 'itemVehiculos';
        this.routeBase = 'vehículos';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
        this.data = {};

    });
