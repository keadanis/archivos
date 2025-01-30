Application.Services
    .factory('RoleResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context +'/api/RoleApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('RoleKey', [['id', 'id']])
    .constant('RoleFilters', [])
    .service('RoleParams', function ($http) {
        this.itemNameEdit = 'itemRoleEdit';
        this.itemName = 'itemRole';
        this.routeBase = 'role';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
        this.data = {};

    });
