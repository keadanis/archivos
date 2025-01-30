Application.Services
    .factory('ActivitiesResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context +'/api/ActivitiesApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('ActivitiesKey', [['id', 'id']])
    .constant('ActivitiesFilters', [['EQUAL','id'], ['EQUAL','descripcion'], ['EQUAL','fecha'], ['EQUAL','observaciones']])
    .service('ActivitiesParams', function ($http) {
        this.itemNameEdit = 'itemActivitiesEdit';
        this.itemName = 'itemActivities';
        this.routeBase = 'activities';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
        this.data = {};

    });
